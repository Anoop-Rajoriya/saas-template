import { useCallback, useEffect, useState } from "react";

const useTimer = (initialTimer: number = 60) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const startTimer = useCallback(() => {
    setTimeLeft(initialTimer);
  }, [initialTimer]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft((preTime) => preTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  return { timeLeft, startTimer, isTimerActive: timeLeft > 0 };
};

export default useTimer;
