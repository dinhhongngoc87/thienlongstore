import io from 'socket.io-client';
import React, { useState } from 'react';
const SocketContext = React.createContext();

const socketServer = io.connect('http://localhost:8080');

const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(socketServer);

    return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};
export { SocketContext };
export default SocketProvider;
