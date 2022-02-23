import { useState } from 'react';
import useEventListener from './use-event-listener';

export default function useWindowSize() {
  const thatWindow = typeof window !== 'undefined' ? window : undefined;
  const [windowSize, setWindowSize] = useState({
    width: thatWindow?.innerWidth,
    height: thatWindow?.innerHeight,
  });

  useEventListener('resize', () => {
    setWindowSize({ width: thatWindow?.innerWidth, height: thatWindow?.innerHeight });
  });

  return windowSize;
}
