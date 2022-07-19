import {
    SBChannelHost,
    SBChannelResub,
    SBChannelSub,
    SBFollow,
    SBGiftBomb,
    SBGiftedSub,
    SBTimeoutBan,
    SBTwitchMessage,
    SBTwitchRaid,
} from '@models/sb';
import useSocketSubscribe, {
    SBEventPayload,
    SocketEvent,
} from '../useSocketSubscribe';

export const useTwitchHost = (cb: (host: SBChannelHost) => void) => {
    useSocketSubscribe<SBEventPayload<SBChannelHost>>('message', (sbEvent) => {
        let { payload } = sbEvent;
        let { event, data } = payload;
        if (event?.type === 'Host' && event?.source === 'Twitch') {
            cb(data);
        }
    });
};

export const useTwitchRaid = (cb: (raid: SBTwitchRaid) => void) => {
    useSocketSubscribe<SBEventPayload<SBTwitchRaid>>('message', (sbEvent) => {
        let { payload } = sbEvent;
        let { event, data } = payload;
        if (event?.type === 'Raid' && event?.source === 'Twitch') {
            cb(data);
        }
    });
};

export const useTwitchCheers = (cb: (message: SBTwitchMessage) => void) => {
    useSocketSubscribe<SBEventPayload<{ message: SBTwitchMessage }>>(
        'message',
        (sbEvent) => {
            let { payload } = sbEvent;
            let { event, data } = payload;
            if (event?.type === 'Cheer' && event?.source === 'Twitch') {
                cb(data.message);
            }
        }
    );
};

export const useTwitchFollow = (cb: (follow: SBFollow) => void) => {
    useSocketSubscribe<SBEventPayload<SBFollow>>(
        'message',
        (sbEvent: SocketEvent) => {
            let { payload } = sbEvent;
            let { event, data } = payload;
            if (event?.type === 'Follow' && event?.source === 'Twitch') {
                cb(data);
            }
        }
    );
};

export const useTwitchGiftBomb = (cb: (giftBomb: SBGiftBomb) => void) => {
    useSocketSubscribe<SBEventPayload<SBGiftBomb>>('message', (sbEvent) => {
        let { payload } = sbEvent;
        let { event, data } = payload;
        if (event?.type === 'GiftBomb' && event?.source === 'Twitch') {
            cb(data);
        }
    });
};

export const useTwitchGiftSub = (cb: (message: SBGiftedSub) => void) => {
    useSocketSubscribe<SBEventPayload<SBGiftedSub>>('message', (sbEvent) => {
        let { payload } = sbEvent;
        let { event, data } = payload;
        if (event?.type === 'GiftSub' && event?.source === 'Twitch') {
            cb(data);
        }
    });
};

export const useTwitchReSub = (cb: (message: SBChannelResub) => void) => {
    useSocketSubscribe<SBEventPayload<SBChannelResub>>('message', (sbEvent) => {
        let { payload } = sbEvent;
        let { event, data } = payload;
        if (event?.type === 'ReSub' && event?.source === 'Twitch') {
            console.log('RESUB');
            cb(data);
        }
    });
};

export const useTwitchSub = (cb: (message: SBChannelSub) => void) => {
    useSocketSubscribe<SBEventPayload<SBChannelSub>>('message', (sbEvent) => {
        let { payload } = sbEvent;
        let { event, data } = payload;
        if (event?.type === 'Sub' && event?.source === 'Twitch') {
            cb(data);
        }
    });
};

export const useTwitchMessage = (cb: (message: SBTwitchMessage) => void) => {
    useSocketSubscribe<SBEventPayload<{ message: SBTwitchMessage }>>(
        'message',
        (sbEvent) => {
            let { payload } = sbEvent;
            let { event, data } = payload;
            if (event?.type === 'ChatMessage' && event?.source === 'Twitch') {
                cb(data.message);
            }
        }
    );
};

export const useTimedoutUser = (cb: (payload: SBTimeoutBan) => void) => {
    useSocketSubscribe<SBEventPayload<SBTimeoutBan>>('message', (sbEvent) => {
        let { payload } = sbEvent;
        let { event, data } = payload;
        if (event?.source === 'Twitch' && event?.type === 'UserTimedOut') {
            cb(data);
        }
    });
};

export const useBannedUser = (cb: (payload: SBTimeoutBan) => void) => {
    useSocketSubscribe<SBEventPayload<SBTimeoutBan>>('message', (sbEvent) => {
        let { payload } = sbEvent;
        let { event, data } = payload;
        if (event?.source === 'Twitch' && event?.type === 'UserBanned') {
            console.log('useBannedUser', data);
            cb(data);
        }
    });
};

export const useTwitchMessageDeleted = (
    cb: (targetMessageId: string) => void
) => {
    useSocketSubscribe<SBEventPayload<{ targetMessageId: string }>>(
        'message',
        (sbEvent) => {
            let { payload } = sbEvent;
            let { event, data } = payload;
            if (
                event?.source === 'Twitch' &&
                event?.type === 'ChatMessageDeleted'
            ) {
                cb(data.targetMessageId);
            }
        }
    );
};
