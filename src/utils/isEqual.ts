/* eslint-disable security/detect-object-injection */
export function isEqual(a: unknown, b: unknown): boolean {
   if (Object.is(a, b)) return true;

   if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) {
      return false;
   }

   if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;
      return a.every((item, index) => isEqual(item, b[index]));
   }

   const aKeys = Object.keys(a as Record<string, unknown>);
   const bKeys = Object.keys(b as Record<string, unknown>);
   if (aKeys.length !== bKeys.length) return false;

   return aKeys.every((key) => isEqual((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key]));
}
