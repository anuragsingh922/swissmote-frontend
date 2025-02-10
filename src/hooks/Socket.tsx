import { useEffect, useState } from "react";
import socket from "../services/socket";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { markAttendence, removeUserEvent } from "@/store/eventSlice";
import { addUserEvent } from "@/store/eventSlice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected:", socket.id);
    });

    socket.on("attendence", (data) => {
      const { event, userEvents } = data;
      console.log({ event, userEvents });
      dispatch(markAttendence(event));
      const eventIdStr = event?._id.toString();
      console.log("Str : ", eventIdStr);
      if (userEvents.includes(eventIdStr)) {
        console.log("Adding");
        dispatch(addUserEvent(eventIdStr));
      } else {
        console.log("Remove");
        dispatch(removeUserEvent(eventIdStr));
      }
      console.log("Socket msg : ", data);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("message");
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    const msg = `Hello from ${socket.id}`;
    socket.emit("message", msg);
  };

  return <></>;
}

export default App;
