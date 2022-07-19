import { SBTwitchRaid } from '@models/sb';
import { useTwitchRaid } from 'hooks/bot';
import useLocalStorage from 'hooks/useLocalStorage';
import { SettingsContext } from 'providers';
import React, { useContext } from 'react';
import {
    AnimatedLatestEventTemplate,
    LatestEventProps,
    LatestEventTypes,
} from '.';
import { TbSword } from 'react-icons/tb';
import Util from 'Util';

export const LatestRaider: React.FC<LatestEventProps> = (
    props: LatestEventProps
) => {
    const settings = useContext(SettingsContext);
    const { latestRaiderTitle, iconSize, iconColor, minTruncateString } =
        settings.overlaySettings.latestEvents;

    const [latestRaider, setLatestRaider] =
        useLocalStorage<SBTwitchRaid | null>(LatestEventTypes.Raid, null);

    useTwitchRaid((raid: SBTwitchRaid) => {
        setLatestRaider(raid);
    });

    const latestDisplayName = Util.truncateString(latestRaider?.displayName, minTruncateString);

    return (
        <AnimatedLatestEventTemplate
            title={latestRaiderTitle}
            name={latestDisplayName}
            icon={<TbSword size={iconSize} color={iconColor} />}
            style={props.style}
        ></AnimatedLatestEventTemplate>
    );
};
