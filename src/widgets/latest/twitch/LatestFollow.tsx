import { SBFollow } from '@models/sb';
import { useTwitchFollow } from 'hooks/bot';
import useLocalStorage from 'hooks/useLocalStorage';
import { SettingsContext } from 'providers';
import React, { useContext } from 'react';
import {
    AnimatedLatestEventTemplate,
    LatestEventProps,
    LatestEventTypes,
} from '.';
import { BsFillSuitHeartFill } from 'react-icons/bs';
import Util from 'Util';

export const LatestFollow: React.FC<LatestEventProps> = (
    props: LatestEventProps
) => {
    const settings = useContext(SettingsContext);
    const { latestFollowerTitle, iconSize, iconColor, minTruncateString } =
        settings.overlaySettings.latestEvents;

    const [latestFollow, setLatestFollow] = useLocalStorage<string>(
        LatestEventTypes.Follow,
        '-'
    );

    useTwitchFollow((follow: SBFollow) => {
        setLatestFollow(follow.userName);
    });

    const latestDisplayName = Util.truncateString(latestFollow, minTruncateString);

    return (
        <AnimatedLatestEventTemplate
            title={latestFollowerTitle}
            name={latestDisplayName}
            icon={<BsFillSuitHeartFill size={iconSize} color={iconColor} />}
            style={props.style}
        ></AnimatedLatestEventTemplate>
    );
};
