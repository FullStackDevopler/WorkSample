import React, { useEffect } from 'react';
import io from 'socket.io-client';

let socket: any;

const SocketManager: React.FC<{ url: string , children: any}> = ({ url, children }) => {

    
    useEffect(() => {
        socket = io(url, {
            transports: ['websocket'],
            upgrade: false
        });

        socket.on('connect', () => {
            console.log('Connected to Socket.IO server');
        });

        socket.on('reconnect', (attempt: any) => {
            console.log('Reconnected to Socket.IO server');
        });

        socket.on('connect_error', (error: any) => {
            console.error('Error in connection', error);
            setTimeout(() => {
                socket.connect();
            }, 10000);
        });

        return () => {
            console.log('disconnect socket');
            
            if (socket) {
                console.log('disconnect socket in socket');

                socket.disconnect();
            }
        };
    }, [url]);

    return <>{children}</>;
};

export { socket, SocketManager };
