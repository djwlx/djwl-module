import { useCallback, useRef } from 'react';

export function useDebounceFn<T extends any[]>(
  callback: (...params: T) => any,
  delay = 1000,
) {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<any>();
  callbackRef.current = callback;

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  const debouncedCallback = useCallback(
    (...args: T) => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    },
    [delay],
  );

  return [debouncedCallback, cancel];
}
