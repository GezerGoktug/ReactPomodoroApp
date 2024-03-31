//! Saniye cinsinden aldığı değeri MM:SS formatına çevirir
export const calculateTime = (time) => {
  const minute = Math.floor(time / 60);
  const seconds = time % 60;
  const updatedMinute = minute < 10 ? "0" + minute : minute;
  const updatedSeconds = seconds < 10 ? "0" + seconds : seconds;
  return `${updatedMinute}:${updatedSeconds}`;
};
