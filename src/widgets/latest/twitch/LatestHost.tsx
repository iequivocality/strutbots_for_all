import React, { useContext } from 'react';
import { SBChannelHost, SBChannelSub } from '@models/sb';
import { useTwitchHost, useTwitchSub } from 'hooks/bot';
import useLocalStorage from 'hooks/useLocalStorage';
import { SettingsContext } from 'providers';
import {
    AnimatedLatestEventTemplate,
    LatestEventProps,
    LatestEventTypes,
} from '.';
import { BsFillMicFill } from 'react-icons/bs';
import Util from 'Util';

export const LatestHost: React.FC<LatestEventProps> = (
    props: LatestEventProps
) => {
    const settings = useContext(SettingsContext);
    const { latestHostTitle, iconSize, iconColor, minTruncateString } =
        settings.overlaySettings.latestEvents;

    const [latestHost, setLatestHost] = useLocalStorage<string>(
        LatestEventTypes.Host,
        '-'
    );

    useTwitchHost((channelHost: SBChannelHost) => {
        setLatestHost(channelHost.displayName);
    });

    const latestDisplayName = Util.truncateString(latestHost, minTruncateString);

    return (
        <AnimatedLatestEventTemplate
            title={latestHostTitle}
            name={latestDisplayName}
            icon={<BsFillMicFill size={iconSize} color={iconColor} />}
            style={props.style}
        ></AnimatedLatestEventTemplate>
    );
};
