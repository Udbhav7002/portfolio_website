import { create } from 'zustand';
import { PROJECTS, Project, ProjectCategory } from '../../data/projects';

export type ViewMode = 'explore' | 'connect' | 'story' | 'insights';

interface FilterState {
  search: string;
  category: ProjectCategory;
}

interface AppState {
  projects: Project[];
  activeView: ViewMode;
  previousView: ViewMode;
  selectedProjectId: string | null;
  filters: FilterState;
  viewedProjectIds: Record<string, true>;
  isResumeModalOpen: boolean;

  // Actions
  setView: (view: ViewMode) => void;
  setSelectedProject: (id: string | null) => void;
  setSearch: (term: string) => void;
  setCategory: (category: ProjectCategory) => void;
  setResumeModalOpen: (open: boolean) => void;
  selectRandomProject: () => void;
}

export const useStore = create<AppState>((set, get) => ({
  projects: PROJECTS,
  activeView: 'explore',
  previousView: 'explore',
  selectedProjectId: null,
  filters: { search: '', category: 'all' },
  viewedProjectIds: {},
  isResumeModalOpen: false,

  setView: (view) => {
    set((s) => ({ activeView: view, previousView: s.activeView }));
  },

  setSelectedProject: (id) => {
    if (id) {
      set((state) => ({
        selectedProjectId: id,
        previousView: state.activeView !== 'connect' ? state.activeView : state.previousView,
        activeView: 'connect',
        viewedProjectIds: { ...state.viewedProjectIds, [id]: true }
      }));
    } else {
      set((state) => ({
        selectedProjectId: null,
        activeView: state.previousView === 'connect' ? 'explore' : state.previousView
      }));
    }
  },

  setSearch: (term) => {
    set((s) => ({ filters: { ...s.filters, search: term } }));
  },

  setCategory: (category) => {
    set((s) => ({ filters: { ...s.filters, category } }));
  },

  setResumeModalOpen: (open) => {
    set({ isResumeModalOpen: open });
  },

  selectRandomProject: () => {
    const { projects, setSelectedProject } = get();
    if (projects.length === 0) return;
    const random = projects[Math.floor(Math.random() * projects.length)];
    setSelectedProject(random.id);
  }
}));
