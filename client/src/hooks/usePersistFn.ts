import { useRef } from "react";

/**
 * usePersistFn instead of useCallback to reduce cognitive load
 */
export function usePersistFn<TArgs extends unknown[], TReturn>(
  fn: (...args: TArgs) => TReturn,
) {
  const fnRef = useRef(fn);
  fnRef.current = fn;

  const persistFn = useRef<((...args: TArgs) => TReturn) | null>(null);
  if (!persistFn.current) {
    persistFn.current = function (this: unknown, ...args) {
      return fnRef.current.apply(this, args);
    };
  }

  return persistFn.current;
}
