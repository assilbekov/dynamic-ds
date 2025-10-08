import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type ColorPreset = {
  id: string;
  name: string;
  primaryHue: number;
  secondaryHue: number;
  createdAt: number;
};

type GlobalState = {
  // UI State
  sidebarOpen: boolean;
  theme: "light" | "dark" | "system";

  // User preferences
  preferredLanguage: string;
  notificationsEnabled: boolean;

  // App state
  lastVisitedPage: string;
  bookmarkedItems: string[];

  // Color presets
  colorPresets: ColorPreset[];
};

type GlobalActions = {
  // Sidebar actions
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;

  // Theme actions
  setTheme: (theme: "light" | "dark" | "system") => void;

  // User preference actions
  setPreferredLanguage: (language: string) => void;
  setNotificationsEnabled: (enabled: boolean) => void;

  // App state actions
  setLastVisitedPage: (page: string) => void;
  addBookmark: (item: string) => void;
  removeBookmark: (item: string) => void;
  clearBookmarks: () => void;

  // Color preset actions
  saveColorPreset: (
    name: string,
    primaryHue: number,
    secondaryHue: number
  ) => void;
  deleteColorPreset: (id: string) => void;
  updateColorPresetName: (id: string, name: string) => void;
  clearAllColorPresets: () => void;

  // Reset
  resetPersistentGlobalStore: () => void;
};

type PersistentGlobalStore = GlobalState & GlobalActions;

const initialState: GlobalState = {
  sidebarOpen: true,
  theme: "system",
  preferredLanguage: "en",
  notificationsEnabled: true,
  lastVisitedPage: "/",
  bookmarkedItems: [],
  colorPresets: [],
};

export const usePersistentGlobalStore = create<PersistentGlobalStore>()(
  persist(
    (set) => ({
      // Initial state
      ...initialState,

      // Sidebar actions
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebar: () =>
        set((state) => ({ sidebarOpen: !state.sidebarOpen })),

      // Theme actions
      setTheme: (theme) => set({ theme }),

      // User preference actions
      setPreferredLanguage: (language) => set({ preferredLanguage: language }),
      setNotificationsEnabled: (enabled) =>
        set({ notificationsEnabled: enabled }),

      // App state actions
      setLastVisitedPage: (page) => set({ lastVisitedPage: page }),
      addBookmark: (item) =>
        set((state) => ({
          bookmarkedItems: [...state.bookmarkedItems, item],
        })),
      removeBookmark: (item) =>
        set((state) => ({
          bookmarkedItems: state.bookmarkedItems.filter((i) => i !== item),
        })),
      clearBookmarks: () => set({ bookmarkedItems: [] }),

      // Color preset actions
      saveColorPreset: (name, primaryHue, secondaryHue) =>
        set((state) => ({
          colorPresets: [
            ...state.colorPresets,
            {
              id: `preset-${Date.now()}-${Math.random()
                .toString(36)
                .substr(2, 9)}`,
              name,
              primaryHue,
              secondaryHue,
              createdAt: Date.now(),
            },
          ],
        })),
      deleteColorPreset: (id) =>
        set((state) => ({
          colorPresets: state.colorPresets.filter((preset) => preset.id !== id),
        })),
      updateColorPresetName: (id, name) =>
        set((state) => ({
          colorPresets: state.colorPresets.map((preset) =>
            preset.id === id ? { ...preset, name } : preset
          ),
        })),
      clearAllColorPresets: () => set({ colorPresets: [] }),

      // Reset
      resetPersistentGlobalStore: () => set(initialState),
    }),
    {
      name: "persistent-global-store",
      storage: createJSONStorage(() => localStorage),
      // Only persist certain fields
      partialize: (state) => ({
        theme: state.theme,
        preferredLanguage: state.preferredLanguage,
        notificationsEnabled: state.notificationsEnabled,
        lastVisitedPage: state.lastVisitedPage,
        bookmarkedItems: state.bookmarkedItems,
        colorPresets: state.colorPresets,
        // Don't persist sidebarOpen - let it reset on page load
      }),
    }
  )
);
