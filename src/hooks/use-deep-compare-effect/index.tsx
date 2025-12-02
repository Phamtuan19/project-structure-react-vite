import { useEffect, useRef } from 'react';

function isEqual(a: any, b: any): boolean {
   if (a === b) return true;
   if (typeof a !== typeof b) return false;

   if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;
      return a.every((item, index) => isEqual(item, b[index]));
   }

   if (typeof a === 'object' && a && b) {
      const aKeys = Object.keys(a);
      const bKeys = Object.keys(b);
      if (aKeys.length !== bKeys.length) return false;
      return aKeys.every((key) => isEqual(a[key], b[key]));
   }

   return false;
}

// Custom hook
export function useDeepCompareEffect(effect: React.EffectCallback, deps: any[]) {
   const ref = useRef<any[]>([]);

   if (!isEqual(deps, ref.current)) {
      ref.current = deps;
   }

   useEffect(effect, [ref.current]);
}
