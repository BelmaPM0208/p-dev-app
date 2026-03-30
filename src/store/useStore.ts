import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Goal {
  id: string;
  progress: number; // 0 to 100
}

interface AppState {
  goals: Record<string, Goal>;
  updateGoalProgress: (id: string, progress: number) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      goals: {
        physical: { id: 'physical', progress: 65 },
        mental: { id: 'mental', progress: 40 },
        personal: { id: 'personal', progress: 80 },
        professional: { id: 'professional', progress: 25 },
      },
      updateGoalProgress: (id, progress) =>
        set((state) => ({
          goals: {
            ...state.goals,
            [id]: { id, progress: Math.min(Math.max(progress, 0), 100) },
          },
        })),
    }),
    {
      name: 'personal-dev-storage',
    }
  )
);
