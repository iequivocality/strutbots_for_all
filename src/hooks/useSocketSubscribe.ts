import { useContext, useEffect } from 'react';
import { SocketContext } from '../providers/SocketProvider';

export type WebsocketEvents = 'message' | 'open' | 'error' | 'close';

export interface SBConnectionEvent {
    id: string;
    status: string;
}

export type SBEventType =
    | 'RewardRedemption'
    | 'FirstWord'
    | 'ChatMessage'
    | 'UserTimedOut'
    | 'UserBanned'
    | 'ChatMessageDeleted'
    | 'Follow'
    | 'Cheer'
    | 'Sub'
    | 'ReSub'
    | 'GiftSub'
    | 'GiftBomb'
    | 'Raid'
    | 'Host';

export interface SBEvent {
    source: 'Twitch' | 'Youtube';
    type: SBEventType;
}

export interface SBEventPayload<T = any> {
    data: T;
    event: SBEvent;
    timeStamp: string;
}

export interface SocketEvent<T = any> {
    socket: WebSocket;
    payload: T;
}

const useSocketSubscribe = <T>(
    eventName: WebsocketEvents = 'message',
    eventHandler: (event: SocketEvent<T>) => void
) => {
    // Get the socket instance
    const { socket } = useContext(SocketContext);

    // when the component, *which uses this hook* mounts,
    // add a listener.
    useEffect(() => {
        // console.log('SB: adding listener', eventName);
        socket?.addEventListener(eventName, (event) => {
            eventHandler(convertToSocketEvent<T>(event));
        });

        // Remove when it unmounts
        return () => {
            // console.log('SB: removing listener', eventName);
            socket?.removeEventListener(eventName, (event) => {
                eventHandler(convertToSocketEvent<T>(event));
            });
        };

        // Sometimes the handler function gets redefined
        // when the component using this hook updates (or rerenders)
        // So adding a dependency makes sure the handler is
        // up to date!
    }, [eventHandler]);
};

const convertToSocketEvent: <T>(event: any) => SocketEvent<T> = (event) => {
    return {
        socket: event.currentTarget,
        payload: event?.data ? JSON.parse(event.data) : {},
    };
};

export default useSocketSubscribe;
