/**
 * Creates a new type by combining two types `T` and `TOverridden`. The resulting type has all the properties of `T`, except for the properties that are also present in `TOverridden`. The properties from `TOverridden` are used instead.
 *
 * @returns A new type that is a combination of `T` and `TOverridden`.
 * @typeParam T - The original type.
 * @typeParam TOverridden - The type with properties to override.
 * @example
 * ```
 * type InputProps = OverrideProps<
 *  ComponentProps<"input">,
 *  {
 *    onChange: (value: string) => void;
 *  }
 * >;
 * ```
 */
export type OverrideProps<T, TOverridden> = Omit<T, keyof TOverridden> & TOverridden;
