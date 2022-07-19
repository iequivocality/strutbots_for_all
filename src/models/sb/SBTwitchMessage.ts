import { SBCheerEmote } from './SBCheerEmote';
import { SBTwitchBadge } from './SBTwitchBadge';
import { SBTwitchEmote } from './SBTwitchEmote';

export interface SBTwitchMessage {
    badges?: SBTwitchBadge[];
    bits: number;
    channel: string;
    cheerEmotes: SBCheerEmote[];
    displayName: string;
    emotes: SBTwitchEmote[];
    firstMessage: boolean;
    hasBits: boolean;
    internal: boolean;
    isAnonymous: boolean;
    isCustomReward: boolean;
    isHighlighted: boolean;
    isMe: boolean;
    isReply: boolean;
    message: string;
    monthsSubscribed: number;
    msgId: string;
    role: number;
    subscriber: boolean;
    userId: number;
    username: string;
}
