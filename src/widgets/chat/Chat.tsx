import React, { useCallback, useContext, useState } from 'react';
import {
    useBannedUser,
    useTimedoutUser,
    useTwitchCheers,
    useTwitchMessage,
    useTwitchMessageDeleted,
} from '../../hooks/bot';

import sanitizeHtml from 'sanitize-html';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import ChatMessage from './ChatMessage';
import { SBTwitchMessage } from '@models/sb';
import { SBTimeoutBan } from '@models/sb';
import { ChatSettings } from '@models/settings';

interface Props {
    chatSettings: ChatSettings;
}

const Chat = (props: Props) => {
    const [messages, setMessages] = useState<SBTwitchMessage[]>([]);
    const {
        top,
        left,
        width,
        height,
        zIndex,
        numberOfMessages,
        blockedUsers,
        commandPrefix,
    } = props.chatSettings;

    let latestMessages =
        messages.length > numberOfMessages
            ? messages.slice(messages.length - numberOfMessages)
            : messages;

    const onReceiveMessage = useCallback(
        (message: SBTwitchMessage) => {
            if (
                blockedUsers.indexOf(message.username) === -1 &&
                !message.message?.trim().startsWith(commandPrefix) &&
                !message.internal
            ) {
                const sanitizedMessage = sanitizeHtml(message.message);
                if (sanitizedMessage.trim().length > 0) {
                    setMessages([...messages, message]);
                }
            }
        },
        [messages, blockedUsers]
    );

    useTwitchMessage(onReceiveMessage);
    useTwitchCheers(onReceiveMessage);

    useBannedUser((payload: SBTimeoutBan) => {
        setMessages([
            ...messages.filter((message) => message.userId !== payload.userId),
        ]);
    });

    useTimedoutUser((payload: SBTimeoutBan) => {
        setMessages([
            ...messages.filter((message) => message.userId !== payload.userId),
        ]);
    });

    useTwitchMessageDeleted((targetMessageId: string) => {
        setMessages([
            ...messages.filter((message) => message.msgId !== targetMessageId),
        ]);
    });

    return (
        <TransitionGroup
            className="widget flex flex-col justify-end overflow-y-hidden"
            id="chat"
            style={{ top, left, width, height, zIndex }}
        >
            {latestMessages.map((message, index) => (
                <CSSTransition
                    key={`transition-${message.msgId}`}
                    timeout={100}
                    classNames="chat-message"
                >
                    <ChatMessage
                        key={`message-${message.msgId}`}
                        message={message}
                        chatSettings={props.chatSettings}
                    />
                </CSSTransition>
            ))}
        </TransitionGroup>
    );
};

export default Chat;
