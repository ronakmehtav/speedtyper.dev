import React, {useEffect} from "react";
import Socket from "../Socket";
import Button from "./Button";

const StartRaceButton = ({
  socket,
  gameId,
  countdown,
  startTime,
  loaded,
}: {
  socket: Socket | null;
  gameId: string;
  countdown: number;
  startTime?: number;
  loaded: boolean;
}) => {
  const disabled = !loaded || !!countdown || !!startTime;

  const handleOnClick = () => {
    socket?.emit("start_race_command", { gameId });
  };

  return (
    <Button
      color="secondary"
      disabled={disabled}
      onClick={handleOnClick}
      title="Start the match"
      text="Start"
    />
  );
}
export default StartRaceButton;
