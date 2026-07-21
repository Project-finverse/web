import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

export interface ProgressData {
  completedLessons: string[];
  completedModules: string[];
  completedQuizzes: string[];
  xp: number;
  streak: number;
  lastActiveDate: string;
  badges: string[];
}

const DEFAULT_PROGRESS: ProgressData = {
  completedLessons: [],
  completedModules: [],
  completedQuizzes: [],
  xp: 0,
  streak: 0,
  lastActiveDate: '',
  badges: [],
};

const STORAGE_KEY = 'finverse_progress';

function loadProgress(): ProgressData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    return { ...DEFAULT_PROGRESS, ...JSON.parse(raw) };
  } catch { return DEFAULT_PROGRESS; }
}

function saveProgress(data: ProgressData) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
}

function updateStreak(data: ProgressData): ProgressData {
  const today = new Date().toISOString().split('T')[0];
  if (data.lastActiveDate === today) return data;
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  return {
    ...data,
    streak: data.lastActiveDate === yesterday ? data.streak + 1 : 1,
    lastActiveDate: today,
  };
}

interface ProgressContextType {
  progress: ProgressData;
  completeLesson: (lessonId: string, xpEarned?: number) => void;
  completeModule: (moduleId: string) => void;
  completeQuiz: (quizId: string, xpEarned?: number) => void;
  earnBadge: (badge: string) => void;
  resetProgress: () => void;
  overallPercent: number;
}

const ProgressContext = createContext<ProgressContextType | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<ProgressData>(loadProgress);

  useEffect(() => { saveProgress(progress); }, [progress]);

  const completeLesson = useCallback((lessonId: string, xpEarned = 10) => {
    setProgress(p => {
      if (p.completedLessons.includes(lessonId)) return p;
      const updated = updateStreak({
        ...p,
        completedLessons: [...p.completedLessons, lessonId],
        xp: p.xp + xpEarned,
      });
      return updated;
    });
  }, []);

  const completeModule = useCallback((moduleId: string) => {
    setProgress(p => {
      if (p.completedModules.includes(moduleId)) return p;
      return updateStreak({
        ...p,
        completedModules: [...p.completedModules, moduleId],
        xp: p.xp + 50,
      });
    });
  }, []);

  const completeQuiz = useCallback((quizId: string, xpEarned = 30) => {
    setProgress(p => {
      if (p.completedQuizzes.includes(quizId)) return p;
      return updateStreak({
        ...p,
        completedQuizzes: [...p.completedQuizzes, quizId],
        xp: p.xp + xpEarned,
      });
    });
  }, []);

  const earnBadge = useCallback((badge: string) => {
    setProgress(p => {
      if (p.badges.includes(badge)) return p;
      return { ...p, badges: [...p.badges, badge] };
    });
  }, []);

  const resetProgress = useCallback(() => {
    setProgress(DEFAULT_PROGRESS);
  }, []);

  const totalLessons = 30;
  const overallPercent = Math.min(100, Math.round((progress.completedLessons.length / totalLessons) * 100));

  return (
    <ProgressContext.Provider value={{ progress, completeLesson, completeModule, completeQuiz, earnBadge, resetProgress, overallPercent }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider');
  return ctx;
}
