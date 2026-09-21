import React, { useState, useMemo } from 'react';
import { Search, Filter, Sparkles, FolderGit2 } from 'lucide-react';
import { useStore } from '../../shared/store/useStore';
import { ProjectCard } from '../../shared/ui/ProjectCard';
import { CATEGORIES, ProjectCategory } from '../../data/projects';

export const Dossier: React.FC = () => {
  const { projects, filters, setSearch, setCategory, setSelectedProject } = useStore();
  const [sort, setSort] = useState<'featured' | 'title'>('featured');

  const filteredProjects = useMemo(() => {
    const list = projects.filter((p) => {
      const matchCat = filters.category === 'all' || p.category === filters.category;
      const searchLower = filters.search.toLowerCase();
      const matchSearch =
        filters.search === '' ||
        p.title.toLowerCase().includes(searchLower) ||
        p.subtitle.toLowerCase().includes(searchLower) ||
        p.techStack.languages.some((l) => l.toLowerCase().includes(searchLower)) ||
        p.techStack.frameworks.some((f) => f.toLowerCase().includes(searchLower)) ||
        p.techStack.tools.some((t) => t.toLowerCase().includes(searchLower));
      return matchCat && matchSearch;
    });

    return list.sort((a, b) => {
      if (sort === 'featured') {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return a.title.localeCompare(b.title);
      }
      return a.title.localeCompare(b.title);
    });
  }, [projects, filters, sort]);

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col">
      {/* Sticky Filter Bar */}
      <section 
        className="sticky top-0 z-10 bg-[#f4f1ea]/95 backdrop-blur-md pb-5 pt-2 border-b border-gray-300 border-dashed mb-8"
        aria-label="Dossier filter controls"
      >
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="text-gray-500" size={17} aria-hidden="true" />
            </div>
            <input
              id="project-search"
              type="search"
              placeholder="Search by system, language, tool, algorithm…"
              className="w-full pl-10 pr-4 py-2 bg-white border-2 border-gray-300 font-mono text-xs focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors rounded-sm"
              value={filters.search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search systems and projects"
            />
          </div>

          {/* Category Chips */}
          <div 
            className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 hide-scrollbar"
            role="group"
            aria-label="Filter by project category"
          >
            <Filter className="text-gray-500 mr-1 shrink-0" size={15} aria-hidden="true" />
            {CATEGORIES.map((cat) => {
              const isActive = filters.category === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => setCategory(cat.value as ProjectCategory)}
                  aria-pressed={isActive}
                  className={`px-2.5 py-1.5 font-mono text-[10.5px] uppercase tracking-wider whitespace-nowrap border-2 transition-colors rounded-sm ${
                    isActive
                      ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Sort Selector */}
          <div className="hidden lg:flex items-center gap-2 font-mono text-xs text-gray-600 shrink-0">
            <span>Sort:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as 'featured' | 'title')}
              className="bg-white border-2 border-gray-300 px-2 py-1 text-xs font-mono focus:outline-none focus:border-gray-900 rounded-sm"
              aria-label="Sort projects"
            >
              <option value="featured">Featured First</option>
              <option value="title">Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Search Results Summary */}
        <div className="flex items-center justify-between mt-3 pt-2 text-[11px] font-mono text-gray-500">
          <span>
            Displaying <strong className="text-gray-900">{filteredProjects.length}</strong> verified systems
            {filters.category !== 'all' && ` in ${filters.category}`}
            {filters.search && ` matching "${filters.search}"`}
          </span>
          <span className="flex items-center gap-1 text-red-700 font-bold">
            <Sparkles size={11} />
            <span>Click any card to inspect architecture</span>
          </span>
        </div>
      </section>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="py-24 text-center border-2 border-dashed border-gray-300 bg-white/60 p-8 rounded-sm font-mono">
          <FolderGit2 className="mx-auto text-gray-400 mb-3" size={36} />
          <h3 className="text-base font-bold uppercase tracking-wide text-gray-800 mb-1">
            No Systems Match Query
          </h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto mb-4">
            Try adjusting your search terms or clearing the category filter to view all archived systems.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setCategory('all');
            }}
            className="px-4 py-2 bg-gray-900 text-white text-xs uppercase tracking-wider font-bold hover:bg-red-700 transition-colors rounded-sm"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={setSelectedProject}
            />
          ))}
        </div>
      )}
    </div>
  );
};
