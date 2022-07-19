import { animated, AnimatedProps } from '@react-spring/web';
import { SettingsContext } from 'providers';
import React, { CSSProperties, FC, ReactNode, useContext } from 'react';

export enum LatestEventTypes {
    Sub = 'LatestSub',
    Follow = 'LatestFollow',
    Raid = 'LatestRaid',
    Resub = 'LatestResub',
    GiftSub = 'LatestGiftSub',
    GiftBomb = 'LatestGiftBomb',
    Cheer = 'LatestCheer',
    LargestCheer = 'LargestCheer',
    Host = 'LatestHost',
}

export interface LatestEventProps
    extends AnimatedProps<{ style: CSSProperties }> {}

export * from './LargestCheer';
export * from './LatestCheers';
export * from './LatestFollow';
export * from './LatestGiftBomb';
export * from './LatestGiftSub';
export * from './LatestHost';
export * from './LatestRaider';
export * from './LatestReSub';
export * from './LatestSub';
export * from '../LatestEventTemplate';
