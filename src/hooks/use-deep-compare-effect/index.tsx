import { isEqual } from '@utils';
import { useEffect, useRef } from 'react';

export function useDeepCompareEffect<T extends readonly unknown[]>(effect: React.EffectCallback, deps: T): void {
   const effectRef = useRef<React.EffectCallback>(effect);
   const depsRef = useRef<T | null>(null);

   // luôn giữ effect mới nhất
   useEffect(() => {
      effectRef.current = effect;
   }, [effect]);

   useEffect(() => {
      if (!depsRef.current || !isEqual(depsRef.current, deps)) {
         depsRef.current = deps;
         return effectRef.current();
      }
      return;
   }, [deps]);
}
