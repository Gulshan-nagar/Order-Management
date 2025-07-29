import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_API_BASE_URL, {
  transports: ['websocket'],
  withCredentials: true,
  autoConnect: false, // prevent auto connect
});

socket.connect(); // manual connect

export default socket;
