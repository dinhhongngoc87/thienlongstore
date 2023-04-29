import { useContext, useState } from "react";
import { SocketContext } from "../context/SocketProvider";
import { useEffect } from "react";
function Messages() {
  const [message, setMessage] = useState("");
  const socket = useContext(SocketContext);
  const handleChangeMessage = (e) => {
    setMessage(e.target.value);
  };
  const sendMessage = async (e) => {
    e.preventDefault();
    if (message) {
      const messageData = {
        author: `admin`,

        message: message,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessage("");
    }
  };
  const joinRoom = async (e) => {};
  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
    });
  }, [socket]);
  return (
    <>
      <form>
        <input type="number" name="room" />
        <button onClick={joinRoom}>Join</button>

        <input
          type="text"
          name="message"
          value={message}
          onChange={handleChangeMessage}
        />
        <button onClick={sendMessage}>Send</button>
      </form>
    </>
  );
}

export default Messages;
