import { useContext, useEffect, useState } from "react";
import { Context } from "../context/Provider";
import { calculateTime } from "../helpers/calculateTime";

const Time = () => {
  const [color, setColor] = useState("dark");
  const { context, defaultTimeState } = useContext(Context);
  const { time, breakTime, mode } = context;
  let activeTime = undefined;
  if (mode === "Session") {
    activeTime = time;
  } else {
    activeTime = breakTime;
  }

  useEffect(() => {
    if (activeTime < defaultTimeState.time / 4) {
      setColor("danger");
    } else if (activeTime > defaultTimeState.time / 4) {
      setColor("dark");
    }
  }, [activeTime, defaultTimeState.time]);
  return (
    <div className="my-4 align-items-center  d-flex flex-column justify-content-center">
      <div
        className={`text-${color} bg-primary-subtle px-5 py-2 border-${color} border  border-2 rounded-2 shadow-lg`}
      >
        <h2
          id="timer-label"
          className={`border-bottom text-center border-${color} border-3 px-5 py-2`}
        >
          {mode}
        </h2>
        <strong id="time-left" className=" display-4 text-center fw-bold px-5">
          {calculateTime(activeTime)}
        </strong>
      </div>
    </div>
  );
};

export default Time;
