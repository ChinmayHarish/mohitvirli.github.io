import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Theme {
  type: string;
  color: string;
}

const AvailableThemes: Theme[] = [{
  type: 'blue',
  color: '#0690d4' // Original Blue (Default)
}, {
  type: 'black',
  color: '#000000' // AMOLED Deep Black
}, {
  type: 'orange',
  color: '#F97316' // Sunset Orange
}, {
  type: 'violet',
  color: '#7c3aed' // Cyber Violet (New Recommendation)
}, {
  type: 'rose',
  color: '#e11d48' // Neon Rose (New Recommendation)
}];

interface ThemeStore {
  themes: Theme[];
  theme: Theme;
  nextTheme: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      themes: [...AvailableThemes],
      theme: AvailableThemes[0],
      nextTheme: () => {
        const themes = get().themes;
        const activeThemeIndex = themes.findIndex(theme => theme.type === get().theme.type);
        const nextThemeIndex = (activeThemeIndex + 1) % themes.length;
        set(() => ({ theme: themes[nextThemeIndex] }));
      },
    }),
    {
      name: "theme-storage",
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);