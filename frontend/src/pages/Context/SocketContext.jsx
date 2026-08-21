import { createContext, useEffect } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

const socketBaseUrl = import.meta.env.VITE_BASE_URL.replace(/\/api\/?$/, "");

// Pass options object with credentials enabled
const socket = io(socketBaseUrl, {
  withCredentials: true,
  transports: ['websocket', 'polling'], // Attempts WebSocket first before polling
  autoConnect: true
});

const SocketProvider = ({ children }) => {
    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to server:', socket.id);
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        socket.on('connect_error', (error) => {
            console.error('Socket connection error:', error.message);
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('connect_error');
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;