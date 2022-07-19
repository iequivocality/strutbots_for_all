import React, { ReactNode, useEffect, useRef, useState } from 'react';

/**
 * https://aravindballa.com/writings/custom-hook-to-listen-websockets/
 */
export const SocketContext = React.createContext<{ socket: WebSocket | null }>({
    socket: null,
});

export interface SocketProviderProps {
    children: ReactNode;
}

const SocketProvider: React.FC<SocketProviderProps> = (
    props: SocketProviderProps
) => {
    const { children } = props;
    let socket = useRef<WebSocket | null>(null);
    const [waitingToReconnect, setWaitingToReconnect] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (waitingToReconnect) {
            return;
        }

        if (!socket.current) {
            const server = new WebSocket('ws://127.0.0.1:8080');
            socket.current = server;

            server.onerror = (e) => console.error(e);

            server.onopen = () => {
                console.log('SB: Connected and authenticated');
                setIsOpen(true);

                server.send(
                    JSON.stringify({
                        request: 'Subscribe',
                        events: {
                            general: ['Custom'],
                            Twitch: [
                                'RewardRedemption',
                                'FirstWord',
                                'ChatMessage',
                                'UserTimedOut',
                                'UserBanned',
                                'ChatMessageDeleted',
                                'Follow',
                                'Cheer',
                                'Sub',
                                'Resub',
                                'GiftSub',
                                'GiftBomb',
                                'Raid',
                                'Host',
                            ],
                        },
                        id: 'strutbots',
                    })
                );
            };

            server.onclose = () => {
                if (!socket.current) {
                    return;
                }

                if (waitingToReconnect) {
                    return;
                }

                setIsOpen(false);
                setWaitingToReconnect(true);
                setTimeout(() => setWaitingToReconnect(false), 5000);
            };

            return () => {
                console.log('Cleanup');
                // Dereference, so it will set up next time
                socket.current = null;

                if (server.readyState !== WebSocket.CONNECTING) {
                    server.close();
                }
            };
        }
    }, [waitingToReconnect]);

    return (
        <SocketContext.Provider value={{ socket: socket.current }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
