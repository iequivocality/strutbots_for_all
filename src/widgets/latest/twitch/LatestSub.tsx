import React, { useContext } from 'react';
import { SBChannelSub } from '@models/sb';
import { useTwitchSub } from 'hooks/bot';
import useLocalStorage from 'hooks/useLocalStorage';
import { SettingsContext } from 'providers';
import {
    AnimatedLatestEventTemplate,
    LatestEventProps,
    LatestEventTypes,
} from '.';
import { BsFillStarFill } from 'react-icons/bs';
import Util from 'Util';

export const LatestSub: React.FC<LatestEventProps> = (
    props: LatestEventProps
) => {
    const settings = useContext(SettingsContext);
    const { latestSubscriberTitle, iconSize, iconColor, minTruncateString } =
        settings.overlaySettings.latestEvents;

    const [latestSub, setLatestSub] = useLocalStorage<string>(
        LatestEventTypes.Sub,
        '-'
    );

    useTwitchSub((channelSub: SBChannelSub) => {
        setLatestSub(channelSub.displayName);
    });

    const latestDisplayName = Util.truncateString(latestSub, minTruncateString);

    return (
        <AnimatedLatestEventTemplate
            title={latestSubscriberTitle}
            name={latestDisplayName}
            icon={<BsFillStarFill size={iconSize} color={iconColor} />}
            style={props.style}
        ></AnimatedLatestEventTemplate>
    );
};
