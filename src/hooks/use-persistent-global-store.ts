import { usePersistentGlobalStore } from "@/stores/persistent-global-store";

/**
 * Hook to access the persistent global store
 * Use this hook in your components to access global state that persists to localStorage
 *
 * @example
 * ```tsx
 * const { sidebarOpen, toggleSidebar } = usePersistentGlobalStoreHook();
 * ```
 */
export const usePersistentGlobalStoreHook = () => {
  const store = usePersistentGlobalStore();
  return store;
};

/**
 * Hook to access specific parts of the persistent global store
 * Use this for better performance - only re-renders when selected state changes
 *
 * @example
 * ```tsx
 * const sidebarOpen = usePersistentGlobalStoreSelector((state) => state.sidebarOpen);
 * const toggleSidebar = usePersistentGlobalStoreSelector((state) => state.toggleSidebar);
 * ```
 */
export const usePersistentGlobalStoreSelector = <T>(
  selector: (state: ReturnType<typeof usePersistentGlobalStore.getState>) => T
): T => {
  return usePersistentGlobalStore(selector);
};
