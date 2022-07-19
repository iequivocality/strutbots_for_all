import { SBCheerEmote } from '@models/sb';
import { SBTwitchEmote } from '@models/sb';
import { ChatSettings } from '@models/settings';
import React, { ReactNode, useContext } from 'react';
import reactStringReplace from 'react-string-replace';

interface Props {
    message: string;
    emotes: SBTwitchEmote[];
    msgId: string;
    cheerEmotes: SBCheerEmote[];
    chatSettings: ChatSettings;
}

const createEmoteNode = (
    msgId: string,
    name: string,
    imageUrl: string,
    index: number,
    badgeSize?: string
) => {
    return (
        <span
            className="mr-1"
            key={`${msgId}-${name}-${index}`}
            style={{ lineHeight: badgeSize }}
        >
            <img
                className="inline-block"
                src={imageUrl}
                alt={name}
                style={{ width: badgeSize, maxHeight: badgeSize }}
            />
        </span>
    );
};

const ChatContent: React.FC<Props> = (props: Props) => {
    let { message, emotes, msgId, chatSettings, cheerEmotes } = props;
    const { badgeSize, contentFontSize, contentFontWeight, messageLineHeight } =
        chatSettings;

    let messageNodes: ReadonlyArray<ReactNode> = emotes.reduce(
        (result: ReadonlyArray<ReactNode>, emote: SBTwitchEmote) =>
            reactStringReplace(result, emote.name, (match, index, offset) => {
                let { name, imageUrl } = emote;
                return createEmoteNode(msgId, name, imageUrl, index, badgeSize);
            }),
        [message]
    );

    messageNodes = cheerEmotes.reduce(
        (result: ReadonlyArray<ReactNode>, emote: SBCheerEmote) =>
            reactStringReplace(result, emote.name, (match, index, offset) => {
                let { name, imageUrl } = emote;
                return createEmoteNode(msgId, name, imageUrl, index, badgeSize);
            }),
        [messageNodes]
    );

    return (
        <div
            className="flex items-center content text-ellipsis"
            style={{
                fontSize: contentFontSize,
                fontWeight: contentFontWeight,
                lineHeight: messageLineHeight,
            }}
        >
            <p>{messageNodes}</p>
        </div>
    );
};

export default ChatContent;
