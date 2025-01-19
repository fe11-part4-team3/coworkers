import { useCallback, useRef } from 'react';

function useDebounce(callback: (...args: any[]) => void, delay: number) {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  return useCallback(
    (...args: any[]) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(
        () => callbackRef.current(...args),
        delay,
      );
    },
    [delay, callback],
  );
}
export default useDebounce;
