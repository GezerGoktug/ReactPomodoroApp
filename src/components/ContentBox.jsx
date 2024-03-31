import Control from "./Control";
import Header from "./Header";
import Time from "./Time";
import TimeControl from "./TimeControl";

const ContentBox = () => {
  return (
    <div className="content-box px-2 py-4 p-sm-4 bg-info rounded-4 shadow-lg border border-primary ">
      <Header />
      <Control />
      <Time />
      <TimeControl />
    </div>
  );
};

export default ContentBox;
