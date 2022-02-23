import { useEffect, useRef } from 'react';

export default function useEventListener(eventType, callback, element) {
  const thatWindow = typeof window !== 'undefined' ? window : undefined;
  if (!element) element = thatWindow;
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (element == null) return;
    const handler = (e) => callbackRef.current(e);
    element.addEventListener(eventType, handler);

    return () => element.removeEventListener(eventType, handler);
  }, [eventType, element]);
}
