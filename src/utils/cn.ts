import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges class names using Tailwind's `twMerge` and `clsx` from `clsx` library.
 *
 * @param inputs - All class names to be merged.
 * @returns The merged class names.
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
