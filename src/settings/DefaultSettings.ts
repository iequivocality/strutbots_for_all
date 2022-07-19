import {
    ChatSettings,
    CreditsSettings,
    OverlaySettings,
} from '@models/settings';
import { LatestEventsSettings } from '@models/settings/LatestEventsSettings';

const normalChat: ChatSettings = {
    top: '720px',
    left: '10px',
    width: '320px',
    height: '305px',
    backgroundColor: 'transparent',
    borderRadius: '10px',
    contentFontSize: '16px',
    contentFontWeight: 600,
    badgeSize: '20px',
    messageBackgroundColor: 'rgba(0, 0, 0, 0.9)',
    messageBorderRadius: '12px',
    messageLineHeight: '18px',
    color: '#FFF',
    fontFamily: 'Montserrat, sans-serif',
    verticalMargin: '10px',
    usernameFontSize: '14px',
    usernameTextTransform: 'uppercase',
    usernameFontWeight: 900,
    numberOfMessages: 5,
    vipBackgroundColor: 'rgba(95, 39, 205, 0.9)',
    moderatorBackgroundColor: 'rgba(16, 172, 132, 0.9)',
    broadcasterBackgroundColor: 'rgba(238, 82, 83, 0.9)',
    blockedUsers: 'thebarbarabot',
    commandPrefix: '!',
    zIndex: 10,
};

const credits: CreditsSettings = {
    headerColor: '#8C437C',
    headerFontSize: '28px',
    headerFontWeight: 700,
    namesColor: '#FFFFFF',
    namesFontSize: '24px',
    namesFontWeight: 500,
    textAlign: 'text-right',
    zIndex: 10,
};

const latestEvents: LatestEventsSettings = {
    top: '600px',
    left: '10px',
    width: '320px',
    height: '60px',
    latestSubscriberTitle: 'Latest Sub',
    latestGiftBombTitle: 'Latest Gift Bomb',
    latestGiftSubTitle: 'Latest Gift Sub',
    latestResubTitle: 'Latest Re-sub',
    latestFollowerTitle: 'Latest Follower',
    latestCheerTitle: 'Latest Cheer',
    latestRaiderTitle: 'Latest Raider',
    latestHostTitle: 'Latest Host',
    largestCheerTitle: 'Largest Cheer',
    shownEvents:
        'sub,follow,gift-bomb,resub,cheer,gift-sub,raid,host,largest-cheer',
    iconSize: '24px',
    iconColor: '#FFFFFF',
    lineHeight: '20px',
    titleFontWeight: 900,
    titleTextTransform: 'uppercase',
    titleFontSize: '14px',
    nameFontWeight: 900,
    nameTextTransform: 'uppercase',
    nameFontSize: '16px',
    minTruncateString: 16,
    zIndex: 20,
};

const DefaultOverlaySettings: OverlaySettings = {
    normalChat: normalChat,
    credits: credits,
    latestEvents: latestEvents,
};

export default DefaultOverlaySettings;
