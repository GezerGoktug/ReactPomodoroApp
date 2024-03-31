import { useContext, useRef } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { VscDebugRestart } from "react-icons/vsc";
import { Context } from "../context/Provider";
import Button from "./Button";
const TimeControl = () => {
  const song = useRef();

  const { isStart, context } = useContext(Context);
  const { playTime, pauseTime, resetTime, time, breakTime } = context;
  //! Reset butonuna tıklandığında ilgili dispatch işlemini yapar aynı zamanda...
  //! Sayaç 00:00 olduğunda çalan müzik çalışıyorsa sıfırlar.
  const handleResetTime = () => {
    resetTime();
    song.current.pause();
    song.current.currentTime = 0;
  };
  //! Sayaç 00:00 olduğunda müziği başlat.
  if (time === 0 || breakTime === 0) {
    song.current.play();
  }
  return (
    <div className="d-flex fs-2 gap-4  justify-content-center align-items-center">
      <Button onClick={isStart ? pauseTime : playTime} id="start_stop">
        {isStart ? <FaPause /> : <FaPlay />}
      </Button>
      <Button onClick={handleResetTime} id="reset">
        <VscDebugRestart />
      </Button>
      <audio
        id="beep"
        preload="auto"
        ref={song}
        src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"
      ></audio>
    </div>
  );
};

export default TimeControl;
