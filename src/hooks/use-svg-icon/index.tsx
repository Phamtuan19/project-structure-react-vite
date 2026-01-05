import { useRef, type ElementType, useState, useEffect, useMemo } from 'react';

/**
 * Pre-load all SVG icons using Vite's glob pattern.
 * This ensures all icons are known at build time for proper bundling.
 */
const iconModules = import.meta.glob<{ ReactComponent: ElementType }>('@/assets/icons/**/*.svg', {
   eager: false,
});

/**
 * Map icon file paths to their import functions.
 * Key format: '/src/assets/icons/icon-name.svg'
 */
const iconMap = new Map<string, () => Promise<{ ReactComponent: ElementType }>>();

Object.entries(iconModules).forEach(([path, importFn]) => {
   // Extract icon name from path
   // Examples:
   //   '/src/assets/icons/react.svg' -> 'react'
   //   'src/assets/icons/react.svg' -> 'react'
   //   '/src/assets/icons/folder/icon.svg' -> 'folder/icon'
   // Use single regex to handle both cases with/without leading slash
   const match = path.match(/[\/]?icons\/(.+?)\.svg$/);
   if (match && match[1]) {
      const iconName = match[1].toLowerCase();
      iconMap.set(iconName, importFn as () => Promise<{ ReactComponent: ElementType }>);
   }
});

/**
 * Default icon size constants.
 */
const DEFAULT_ICON_SIZE = 24;
const DEFAULT_VIEWBOX = '0 0 24 24';

/**
 * Validates icon name to prevent path traversal and invalid characters.
 *
 * @param name - Icon name to validate
 * @returns True if valid, false otherwise
 */
const isValidIconName = (name: string): boolean => {
   if (!name || typeof name !== 'string') return false;
   // Allow alphanumeric, hyphens, underscores, and forward slashes (for subdirectories)
   return /^[a-zA-Z0-9/_-]+$/.test(name) && !name.includes('..');
};

/**
 * Custom hook to dynamically import SVG icons from the assets/icons directory.
 *
 * Uses Vite's import.meta.glob for build-time optimization and proper bundling.
 * Handles race conditions, loading states, and errors gracefully.
 *
 * @param name - Icon name without extension (e.g., 'react' for 'react.svg')
 * @returns Object containing error, loading state, and Icon component
 *
 * @example
 * ```tsx
 * const { Icon, loading, error } = useSvgIcon('react');
 * if (loading) return <div>Loading...</div>;
 * if (error) return <div>Error: {error.message}</div>;
 * return Icon ? <Icon /> : null;
 * ```
 */
export function useSvgIcon(name: string) {
   const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<Error | null>(null);
   const iconRef = useRef<ElementType | null>(null);
   const abortControllerRef = useRef<AbortController | null>(null);

   // Normalize icon name: lowercase and trim
   const normalizedName = useMemo(() => {
      if (!name) return '';
      return name.toLowerCase().trim();
   }, [name]);

   useEffect(() => {
      // Reset state when name changes
      setLoading(true);
      setError(null);
      iconRef.current = null;

      // Abort previous request if still pending
      if (abortControllerRef.current) {
         abortControllerRef.current.abort();
      }

      // Create new abort controller for this request
      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      // Validate icon name
      if (!normalizedName) {
         setError(new Error('Icon name is required'));
         setLoading(false);
         return;
      }

      if (!isValidIconName(normalizedName)) {
         setError(
            new Error(
               `Invalid icon name: "${normalizedName}". Only alphanumeric, hyphens, underscores, and forward slashes are allowed.`,
            ),
         );
         setLoading(false);
         return;
      }

      // Find icon in pre-loaded map
      const iconImporter = iconMap.get(normalizedName);

      if (!iconImporter) {
         setError(
            new Error(`Icon "${normalizedName}" not found. Available icons: ${Array.from(iconMap.keys()).join(', ')}`),
         );
         setLoading(false);
         return;
      }

      // Import icon
      const importIcon = async (): Promise<void> => {
         try {
            const module = await iconImporter();

            // Check if request was aborted
            if (abortController.signal.aborted) {
               return;
            }

            if (!module?.ReactComponent) {
               throw new Error(`Icon "${normalizedName}" does not export ReactComponent`);
            }

            iconRef.current = module.ReactComponent;
            setError(null);
         } catch (err) {
            // Don't set error if request was aborted
            if (abortController.signal.aborted) {
               return;
            }

            if (err instanceof Error) {
               setError(err);
            } else {
               setError(new Error(`Failed to load icon "${normalizedName}"`));
            }
         } finally {
            // Only update state if request wasn't aborted
            if (!abortController.signal.aborted) {
               setLoading(false);
            }
         }
      };

      void importIcon();

      // Cleanup function
      return () => {
         abortController.abort();
      };
   }, [normalizedName]);

   return {
      error: error ?? undefined,
      loading,
      Icon: iconRef.current,
      DEFAULT_ICON_SIZE,
      DEFAULT_VIEWBOX,
   };
}

export { DEFAULT_ICON_SIZE, DEFAULT_VIEWBOX };
