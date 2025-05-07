import { useRef, type ElementType, useState, useEffect } from 'react';

export function useSvgIcon(name: string) {
   const importedIconRef = useRef<ElementType | null>(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<Error>();

   useEffect(() => {
      setLoading(true);

      const importSvgIcon = async (): Promise<void> => {
         try {
            const { ReactComponent } = await import(`../../assets/icons/${name}.svg`);
            importedIconRef.current = ReactComponent;
         } catch (err) {
            if (err instanceof Error) {
               setError(err);
            }
         } finally {
            setLoading(false);
         }
      };

      importSvgIcon();
   }, [name]);

   return { error, loading, Icon: importedIconRef.current };
}
