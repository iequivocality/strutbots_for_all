import { SBChannelSub } from './SBChannelSub';

export interface SBChannelResub extends SBChannelSub {
    cumulativeMonths: number;
    shareStreak: boolean;
    streakMonths: number;
}
