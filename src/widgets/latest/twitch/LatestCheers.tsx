import { SBTwitchMessage } from '@models/sb';
import { useTwitchCheers } from 'hooks/bot';
import useLocalStorage from 'hooks/useLocalStorage';
import { SettingsContext } from 'providers';
import React, { useContext } from 'react';
import {
    AnimatedLatestEventTemplate,
    LatestEventProps,
    LatestEventTypes,
} from '.';
import { useTwitchCheersWithLargest } from './hooks';
import { GiPartyHat } from 'react-icons/gi';
import Util from 'Util';

export const LatestCheers: React.FC<LatestEventProps> = (
    props: LatestEventProps
) => {
    const settings = useContext(SettingsContext);
    const { latestCheerTitle, iconSize, iconColor, minTruncateString } =
        settings.overlaySettings.latestEvents;

    const latestCheer = useTwitchCheersWithLargest()[1];
    const latestDisplayName = Util.truncateString(latestCheer?.displayName, minTruncateString);

    return (
        <AnimatedLatestEventTemplate
            title={latestCheerTitle}
            name={
                latestCheer
                    ? `${latestDisplayName} - ${latestCheer?.bits}`
                    : '-'
            }
            icon={<GiPartyHat size={iconSize} color={iconColor} />}
            style={props.style}
        ></AnimatedLatestEventTemplate>
    );
};
