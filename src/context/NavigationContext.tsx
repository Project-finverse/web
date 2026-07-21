import { createContext, useContext, useState, type ReactNode } from 'react';

export type Page =
  | 'home'
  | 'learn'
  | 'modules'
  | 'lesson'
  | 'quiz'
  | 'progress'
  | 'simulators'
  | 'labs'
  | 'labs-class'
  | 'labs-plan'
  | 'labs-dashboard'
  | 'lab'
  | 'about'
  | 'pricing'
  | 'contact'
  | 'class9';

interface NavState {
  page: Page;
  moduleId?: string;
  lessonIndex?: number;
  labId?: string;
  classNum?: number;
  plan?: 'basic' | 'intermediate' | 'advanced';
}

interface NavigationContextType {
  state: NavState;
  navigate: (page: Page, moduleId?: string, lessonIndex?: number) => void;
  openLab: (labId: string) => void;
  selectClass: (classNum: number) => void;
  selectPlan: (plan: 'basic' | 'intermediate' | 'advanced') => void;
  goHome: () => void;
}

const NavigationContext = createContext<NavigationContextType | null>(null);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<NavState>({ page: 'home' });

  const navigate = (page: Page, moduleId?: string, lessonIndex?: number) => {
    setState(prev => ({ ...prev, page, moduleId, lessonIndex }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openLab = (labId: string) => {
    setState(prev => ({ ...prev, page: 'lab', labId }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectClass = (classNum: number) => {
    setState(prev => ({ ...prev, page: 'labs-plan', classNum }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectPlan = (plan: 'basic' | 'intermediate' | 'advanced') => {
    setState(prev => ({ ...prev, page: 'labs-dashboard', plan }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goHome = () => {
    setState({ page: 'home' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <NavigationContext.Provider value={{ state, navigate, openLab, selectClass, selectPlan, goHome }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const ctx = useContext(NavigationContext);
  if (!ctx) throw new Error('useNavigation must be used within NavigationProvider');
  return ctx;
}
