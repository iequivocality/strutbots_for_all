import { SBChannelSub } from './SBChannelSub';

export interface SBGiftedSub extends SBChannelSub {
    cumulativeMonths: number;
    fromSubBomb: boolean;
    isAnonymous: boolean;
    monthsGifted: number;
    recipientDisplayName: string;
    recipientUserId: number;
    recipientUsername: string;
    subBombCount: number;
    totalSubsGifted: number;
}
