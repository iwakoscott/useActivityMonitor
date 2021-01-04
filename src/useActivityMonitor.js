import { useDebugValue, useEffect, useRef } from "react";

export const useActivityMonitor = (
  callback,
  { when, wait = 5000, events = ["click"] } = {}
) => {
  const timerRef = useRef();
  useEffect(() => {
    function resetTimer() {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(callback, wait);
    }

    function clearTimer() {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (!when) return;

    resetTimer();

    for (const event of events) {
      document.addEventListener(event, resetTimer);
    }
    return () => {
      clearTimer();
      for (const event of events) {
        document.removeEventListener(event, resetTimer);
      }
    };
  }, [events, when, wait, callback]);
};
