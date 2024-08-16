import { useEffect, useState } from "react";
import audioMp3 from "@/assets/audio/timer.mp3";
import styles from "@/components/Stopwatch/stopwatch.module.scss";
import { STOPWATCH_RESET, STOPWATCH_START } from "../Svg/svg";

export default function StopWatch() {
  const [timer, setTimer] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isAudioRunning, setIsAudioRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevVal) => prevVal - 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timer, isRunning]);

  const playAudioAndStartTimer = () => {
    const audio = new Audio(audioMp3);
    audio.play();

    audio.addEventListener("ended", () => {
      setIsAudioRunning(true);
      setIsRunning(true); // Start the timer after audio ends
    });
  };

  const handleClick = () => {
    setIsRunning(true);
    setIsAudioRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimer(25 * 60);
  };

  const handleIncrease = (val: number) => {
    setTimer((prevVal) => prevVal + val * 60);
  };

  const handleDecrease = (val: number) => {
    setTimer((prevVal) => {
      if (prevVal - val * 60 < 5 * 60) {
        return 5 * 60;
      }
      return prevVal - val * 60;
    });
  };

  return (
    <div className={`${styles.stopwatch} flex_row flex_center`}>
      <button
        disabled={isRunning}
        className={styles.decrease_btn}
        onClick={() => handleDecrease(5)}
      >
        -5 Min
      </button>

      <button
        disabled={isRunning}
        className={styles.stopwatch_start}
        onClick={isAudioRunning ? handleClick : playAudioAndStartTimer}
      >
        <STOPWATCH_START />
      </button>
      <h1
        style={{
          color:
            timer < 5 * 60
              ? "#FF0060"
              : timer < timer / 2
              ? "#F6FA70"
              : "#00DFA2",
        }}
      >
        {String(Math.floor(timer / 60)).padStart(2, "0")}:
        {String(timer % 60).padStart(2, "0")}
      </h1>
      <button className={styles.stopwatch_reset} onClick={handleReset}>
        <STOPWATCH_RESET />
      </button>
      <button
        disabled={isRunning}
        className={styles.increase_btn}
        onClick={() => handleIncrease(5)}
      >
        +5 Min
      </button>
    </div>
  );
}
