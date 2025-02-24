import { io } from "socket.io-client";

const socket = io("https://swissmote-backend-j0j9.onrender.com", {
    withCredentials: true, // Allow credentials like cookies & auth headers
    transports: ["websocket"], // Force WebSocket mode
    autoConnect: false, // Prevent auto-connect, use `socket.connect()` manually
});

socket.on("connect", () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});

socket.on("disconnect", () => {
    console.log(socket.id); // undefined
});

export default socket;
