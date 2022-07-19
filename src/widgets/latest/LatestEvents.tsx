import { config, useSpringRef, useTransition } from '@react-spring/web';
import useInterval from 'hooks/useInterval';
import { SettingsContext } from 'providers';
import React, { useContext, useEffect, useState } from 'react';
import {
    LargestCheer,
    LatestCheers,
    LatestFollow,
    LatestGiftBomb,
    LatestGiftSub,
    LatestHost,
    LatestRaider,
    LatestReSub,
    LatestSub,
} from './twitch';

interface Props {}

const LatestEvents: React.FC<Props> = (props: Props) => {
    const settings = useContext(SettingsContext);
    const { shownEvents, top, left, width, height, zIndex } =
        settings.overlaySettings.latestEvents;
    const shownEventsArr = shownEvents.split(',');

    const [shownIndex, setShownIndex] = useState(0);
    const transRef = useSpringRef();
    const transitions = useTransition(shownIndex, {
        key: shownIndex,
        from: { opacity: 0, transform: 'rotateX(180deg)' },
        enter: { opacity: 1, transform: 'rotateX(0deg)' },
        leave: { opacity: 0, transform: 'rotateX(180deg)' },
        config: config.slow,
    });

    useInterval(() => {
        setShownIndex((state) => (state + 1) % shownEventsArr.length);
    }, 3000);

    useEffect(() => {
        transRef.start();
    }, [shownIndex]);

    return (
        <div
            className="absolute flex flex-col justify-center items-center latest-events-container"
            style={{
                top: top,
                left: left,
                width: width,
                height: height,
                zIndex,
            }}
        >
            {transitions((style, i) => {
                const event = shownEventsArr[i].trim();
                if (event === 'sub') {
                    return <LatestSub style={style} />;
                } else if (event === 'follow') {
                    return <LatestFollow style={style} />;
                } else if (event === 'gift-bomb') {
                    return <LatestGiftBomb style={style} />;
                } else if (event === 'gift-sub') {
                    return <LatestGiftSub style={style} />;
                } else if (event === 'resub') {
                    return <LatestReSub style={style} />;
                } else if (event === 'cheer') {
                    return <LatestCheers style={style} />;
                } else if (event === 'raid') {
                    return <LatestRaider style={style} />;
                } else if (event === 'host') {
                    return <LatestHost style={style} />;
                } else if (event === 'largest-cheer') {
                    return <LargestCheer style={style} />;
                }
            })}
        </div>
    );
};

export default LatestEvents;
