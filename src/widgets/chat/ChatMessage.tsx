import { SBTwitchMessage } from '@models/sb';
import { ChatSettings } from '@models/settings';
import React, { useContext } from 'react';
import ChatContent from './ChatContent';
import ChatHeader from './ChatHeader';

interface Props {
    message: SBTwitchMessage;
    chatSettings: ChatSettings;
}

const ChatMessage = (props: Props) => {
    const { chatSettings } = props;
    const {
        message,
        emotes,
        msgId,
        badges,
        username,
        role,
        cheerEmotes,
        isAnonymous,
    } = props.message;
    const {
        messageBackgroundColor,
        broadcasterBackgroundColor,
        moderatorBackgroundColor,
        vipBackgroundColor,
        messageBorderRadius,
        usernameFontSize,
        color,
        verticalMargin,
    } = chatSettings;

    let backgroundColor = messageBackgroundColor;
    if (role === 4) {
        backgroundColor = broadcasterBackgroundColor;
    } else if (role === 3) {
        backgroundColor = moderatorBackgroundColor;
    } else if (role === 2) {
        backgroundColor = vipBackgroundColor;
    }

    return (
        <div
            className="relative p-3"
            style={{
                backgroundColor: backgroundColor,
                borderRadius: messageBorderRadius,
                marginTop: verticalMargin,
                color,
                fontSize: usernameFontSize,
                lineHeight: usernameFontSize,
            }}
        >
            <ChatHeader
                username={username}
                badges={badges}
                chatSettings={chatSettings}
                isAnonymous={isAnonymous}
            />
            <ChatContent
                msgId={msgId}
                message={message}
                emotes={emotes}
                chatSettings={chatSettings}
                cheerEmotes={cheerEmotes}
            />
        </div>
    );
};

export default ChatMessage;
