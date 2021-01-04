import { useEffect } from "react";

export const useActivityMonitor = (
  callback,
  { when, wait = 5000, events = ["click"] } = {}
) => {
  useEffect(() => {
    let timeout;
    function resetTimer() {
      clearTimeout(timeout);
      timeout = setTimeout(callback, wait);
    }

    function clearTimer() {
      clearTimeout(timeout);
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
