import { SBChannelResub } from '@models/sb';
import { useTwitchReSub } from 'hooks/bot';
import useLocalStorage from 'hooks/useLocalStorage';
import { SettingsContext } from 'providers';
import React, { useContext } from 'react';
import { BsFillStarFill } from 'react-icons/bs';
import Util from 'Util';
import {
    AnimatedLatestEventTemplate,
    LatestEventProps,
    LatestEventTypes,
} from '.';

export const LatestReSub: React.FC<LatestEventProps> = (
    props: LatestEventProps
) => {
    const settings = useContext(SettingsContext);
    const { latestResubTitle, iconSize, iconColor, minTruncateString } =
        settings.overlaySettings.latestEvents;

    const [latestResub, setLatestResub] = useLocalStorage<string>(
        LatestEventTypes.Resub,
        '-'
    );

    useTwitchReSub((channelSub: SBChannelResub) => {
        setLatestResub(channelSub.displayName);
    });

    const latestDisplayName = Util.truncateString(latestResub, minTruncateString);

    return (
        <AnimatedLatestEventTemplate
            title={latestResubTitle}
            name={latestDisplayName}
            icon={<BsFillStarFill size={iconSize} color={iconColor} />}
            style={props.style}
        ></AnimatedLatestEventTemplate>
    );
};
