import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

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
        // Don't persist sidebarOpen - let it reset on page load
      }),
    }
  )
);
