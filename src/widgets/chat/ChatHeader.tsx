import { SBTwitchBadge } from '@models/sb';
import { ChatSettings } from '@models/settings';
import React, { ReactNode } from 'react';

interface Props {
    username?: string;
    badges?: SBTwitchBadge[];
    chatSettings: ChatSettings;
    isAnonymous?: boolean;
}

const ChatHeader: React.FC<Props> = (props: Props) => {
    const { username, badges, chatSettings, isAnonymous } = props;
    const { badgeSize, usernameTextTransform, usernameFontWeight } =
        chatSettings;

    let headerNodes: ReadonlyArray<ReactNode> = (badges ? badges : []).map(
        (badge: SBTwitchBadge) => {
            const { imageUrl, name } = badge;
            return (
                <span className="mr-1" key={name}>
                    <img
                        src={imageUrl}
                        alt={name}
                        style={{ width: badgeSize, maxHeight: badgeSize }}
                    />
                </span>
            );
        }
    );

    return (
        <div className="flex flex-row items-center header mb-2">
            {headerNodes}
            <span
                className="tracking-tight"
                style={{
                    textTransform: usernameTextTransform,
                    fontWeight: usernameFontWeight,
                }}
            >
                {!isAnonymous ? username : null}
            </span>
        </div>
    );
};

export default ChatHeader;
