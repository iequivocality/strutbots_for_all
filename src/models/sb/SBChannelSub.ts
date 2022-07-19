import { SBTwitchBadge } from './SBTwitchBadge';
import { SBTwitchEmote } from './SBTwitchEmote';

export interface SBChannelSub {
    badges: SBTwitchBadge[];
    color: string;
    displayName: string;
    emotes: SBTwitchEmote[];
    message: string;
    role: number;
    subTier: number;
    userId: number;
    userName: string;
}
