import { SettingsContext } from 'providers';
import React, {
    ReactNode,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';
import useSocketSubscribe from '../../hooks/useSocketSubscribe';
import { SocketContext } from '../../providers/SocketProvider';
import CreditHeaders from './CreditHeaders';

interface HypeTrainCredit {
    conductors: string[];
    contributors: string[];
}

interface UsersTypesForCredit {
    editors: string[];
    moderators: string[];
    subscribers: string[];
    vips: string[];
}

interface StreamEventsForCredit {
    follows: string[];
    cheers: string[];
    subs: string[];
    reSubs: string[];
    giftSubs: string[];
    giftBombs: string[];
    raided: string[];
    rewardRedemptions: string[];
    goalContributions: string[];
    pyramids: string[];
}

interface CreditsEvent {
    id: string;
    custom: { [key: string]: string };
    events: StreamEventsForCredit;
    groups: { [key: string]: string };
    hypeTrain: HypeTrainCredit;
    status: string;
    users: UsersTypesForCredit;
}

function getParameterCaseInsensitive<T = any>(object: T, key: string) {
    let param = null;
    if (object) {
        let objectKeys = Object.keys(object);
        for (let objKey of objectKeys) {
            if (objKey.toLowerCase() === key.toLowerCase()) {
                param = (object as any)[objKey];
            }
        }
    }

    return param;
}

export const Credits = () => {
    const socketContext = useContext(SocketContext);
    const settingsContext = useContext(SettingsContext);
    const containerEl = useRef<HTMLDivElement>(null);
    const [creditsData, setCreditsData] = useState<CreditsEvent | null>(null);
    const { credits } = settingsContext.overlaySettings;
    const { textAlign } = credits;

    useSocketSubscribe<any>('open', () => {
        const msg = {
            id: 'credits',
            request: 'GetCredits',
        };
        socketContext.socket?.send(JSON.stringify(msg));
    });

    useSocketSubscribe<CreditsEvent>('message', (event) => {
        if (event.payload?.id === 'credits') {
            setCreditsData(event.payload);
            console.log('EVENT CREDITS', event.payload);

            let container = containerEl.current;
            setTimeout(() => {
                if (container) {
                    const creditsHeight =
                        Math.ceil(
                            (container.offsetHeight / window.innerHeight) * -100
                        ) - 10;
                    const duration =
                        ((container.offsetHeight / window.innerHeight) * 100 +
                            100) *
                        60;
                    const creditsAnimation = container.animate(
                        [{ top: '110%' }, { top: creditsHeight + '%' }],
                        {
                            duration: duration,
                            iterations: Infinity,
                        }
                    );
                }
            }, 500);
        }
    });

    const existingUserMap: { [key: string]: any[] } = {};
    const creditElements: ReactNode[] = [];
    for (const header of CreditHeaders) {
        const headerSection = getParameterCaseInsensitive(
            creditsData,
            header.section
        );
        if (headerSection) {
            let eventData: any[] = getParameterCaseInsensitive(
                headerSection,
                header.key
            );
            if (!eventData) {
                continue;
            }

            if (header.filterExistingEntries) {
                eventData = eventData.filter(
                    (e) =>
                        !existingUserMap[header.section] ||
                        !existingUserMap[header.section].includes(e)
                );
            }

            if (eventData.length > 0) {
                creditElements.push(
                    <div
                        key={`${header.title}`}
                        className={`${textAlign} uppercase job`}
                        style={{
                            color: credits.headerColor,
                            fontWeight: credits.headerFontWeight,
                            fontSize: credits.headerFontSize,
                        }}
                    >
                        {header.title}
                    </div>
                );
                Object.values(eventData)
                    .filter((entry) => entry !== 'Fossabot')
                    .forEach((entry) => {
                        creditElements.push(
                            <div
                                key={`${header.title}-${entry}`}
                                className={`${textAlign} name`}
                                style={{
                                    color: credits.namesColor,
                                    fontWeight: credits.namesFontWeight,
                                    fontSize: credits.namesFontSize,
                                }}
                            >
                                {entry}
                            </div>
                        );
                    });

                if (!existingUserMap[header.section]) {
                    existingUserMap[header.section] = [];
                }
                existingUserMap[header.section].push(...eventData);
            }
        }
    }

    return (
        <div className="flex justify-end relative overflow-y-hidden text-center text-neutral-900 credits-wrapper">
            <div className="absolute credits" ref={containerEl}>
                {creditElements}
            </div>
        </div>
    );
};
