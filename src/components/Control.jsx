import { useContext } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { Context } from "../context/Provider";
import Button from "./Button";
const Control = () => {
  const { defaultTimeState, context } = useContext(Context);
  const { handleBreakLength, handleTimeLength } = context;
  const timeState = {
    formattedTime: (defaultTimeState.time / 60).toFixed(2),
    formattedBreakTime: (defaultTimeState.breakTime / 60).toFixed(2),
  };
  const { formattedTime, formattedBreakTime } = timeState;
  return (
    <div className="d-flex gap-2 gap-sm-5">
      <div className="px-2 px-sm-5 py-3 bg-primary-subtle shadow-lg rounded-2  border border-secondary border-2">
        <h5
          id="break-label"
          className="border-bottom border-secondary border-2 pb-2 "
        >
          Break Length
        </h5>
        <div className="d-flex  fs-4  justify-content-center align-items-center gap-3">
          <Button
            id="break-decrement"
            className="decrease"
            onClick={() => handleBreakLength("decrease-break-time")}
          >
            <FaMinus />
          </Button>
          <strong id="break-length">
            {formattedBreakTime.endsWith(".00")
              ? formattedBreakTime.slice(0, -3)
              : formattedBreakTime}
          </strong>
          <Button
            id="break-increment"
            className="increase"
            onClick={() => handleBreakLength("increase-break-time")}
          >
            <FaPlus />
          </Button>
        </div>
      </div>
      <div className="px-2 px-sm-5 py-3 bg-primary-subtle shadow-lg rounded-2 border border-secondary border-2">
        <h5
          id="session-label"
          className="border-bottom border-secondary border-2 pb-2 "
        >
          Session Length
        </h5>
        <div className="d-flex fs-4 justify-content-center align-items-center gap-3">
          <Button
            id="session-decrement"
            className="decrease"
            onClick={() => handleTimeLength("decrease-time")}
          >
            <FaMinus />
          </Button>
          <strong id="session-length">
            {formattedTime.endsWith(".00")
              ? formattedTime.slice(0, -3)
              : formattedTime}
          </strong>
          <Button
            id="session-increment"
            className="increase"
            onClick={() => handleTimeLength("increase-time")}
          >
            <FaPlus />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Control;
