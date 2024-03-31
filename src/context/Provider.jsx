import { createContext, useReducer, useState } from "react";

export const Context = createContext();
let timeFunc = undefined;

const defaultTimeState = {
  time: 1500,
  breakTime: 300,
  mode: "Session",
};

const timeReducer = (state, action) => {
  switch (action.type) {
    //! Oturum süresini artırır(alabileceği max=60dk,min=1dk)
    case "increase-time":
      if (defaultTimeState.time < 3600) 
        defaultTimeState.time += 60;

      return {
        time: defaultTimeState.time,
        breakTime: defaultTimeState.breakTime,
        mode: "Session",
      };
    //! Oturum süresini azaltır(alabileceği max=60dk,min=1dk)  
    case "decrease-time":
      if (defaultTimeState.time - 60 > 0)
        defaultTimeState.time -= 60;

      return {
        time: defaultTimeState.time,
        breakTime: defaultTimeState.breakTime,
        mode: "Session",
      };
    //! Mola süresini artırır(alabileceği max=60dk,min=1dk)  
    case "increase-break-time":
      if (defaultTimeState.breakTime < 3600)
        defaultTimeState.breakTime += 60;

      return {
        time: defaultTimeState.time,
        breakTime: defaultTimeState.breakTime,
        mode: "Session",
      };
    //! Mola süresini azaltır(alabileceği max=60dk,min=1dk)    
    case "decrease-break-time":
      if (defaultTimeState.breakTime - 60 > 0) 
        defaultTimeState.breakTime -= 60;

      return {
        time: defaultTimeState.time,
        breakTime: defaultTimeState.breakTime,
        mode: "Session",
      };
    //! Sayacı çalıştırır.Oturum süresi dolduğunda modu değiştirip Mola süresini...
    //! başlatır.Oda bittiğinde yeniden oturum süresini başlatır.  
    case "play-time":
      if (state.mode === "Session") {
        if (state.time === 0) {
          return {
            time: defaultTimeState.time,
            breakTime: defaultTimeState.breakTime,
            mode: "Break",
          };
        } else {
          return {
            time: state.time - 1,
            breakTime: defaultTimeState.breakTime,
            mode: "Session",
          };
        }
      } else {
        if (state.breakTime === 0) {
          return {
            time: defaultTimeState.time,
            breakTime: defaultTimeState.breakTime,
            mode: "Session",
          };
        } else {
          return {
            time: defaultTimeState.time,
            breakTime: state.breakTime - 1,
            mode: "Break",
          };
        }
      }
    //! Sayacı durdurur   
    case "stop-time":
      clearInterval(timeFunc);
      return state;
    //! Sayacı varsayılan ayarlarına döndürürür(fabrika ayarlarına gibi) sıfırlar.  
    case "reset-time":
      clearInterval(timeFunc);
      defaultTimeState.time = 1500;
      defaultTimeState.breakTime = 300;
      return {
        time: defaultTimeState.time,
        breakTime: defaultTimeState.breakTime,
        mode: "Session",
      };
  }
};
export const Provider = ({ children }) => {
  //! Sayacın çalışıp çalışmadığını tutan state.
  const [isStart, setİsStart] = useState(false);
  //! Sayaç işlemleri için useReducer hook
  const [timeState, dispatchTimeAction] = useReducer(
    timeReducer,
    defaultTimeState
  );
  const context = {
    time: timeState.time,
    breakTime: timeState.breakTime,
    mode: timeState.mode,
    handleBreakLength: (type) => {
      //! Sayaç çalışmıyorken mola süresi değiştirme işlemi yap
      if (!isStart) 
        dispatchTimeAction({ type: type });
    },
    handleTimeLength: (type) => {
      //! Sayaç çalışmıyorken oturum süresi değiştirme işlemi yap
      if (!isStart)
        dispatchTimeAction({ type: type });
    },
    playTime: () => {
      setİsStart(true);
      timeFunc = setInterval(() => {
        dispatchTimeAction({ type: "play-time" });
      }, 1000);
    },
    pauseTime: () => {
      setİsStart(false);
      dispatchTimeAction({ type: "stop-time" });
    },
    resetTime: () => {
      setİsStart(false);
      dispatchTimeAction({ type: "reset-time" });
    },
  };
  return (
    <Context.Provider
      value={{ context, isStart, setİsStart, defaultTimeState }}
    >
      {children}
    </Context.Provider>
  );
};
