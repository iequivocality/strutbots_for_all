import { SettingsContext } from 'providers';
import React, { useContext } from 'react';
import { GiPartyHat } from 'react-icons/gi';
import Util from 'Util';
import { AnimatedLatestEventTemplate, LatestEventProps } from '.';
import { useTwitchCheersWithLargest } from './hooks';

export const LargestCheer: React.FC<LatestEventProps> = (
    props: LatestEventProps
) => {
    const settings = useContext(SettingsContext);
    const { largestCheerTitle, iconSize, iconColor, minTruncateString } =
        settings.overlaySettings.latestEvents;

    const largestCheer = useTwitchCheersWithLargest()[0];
    const latestDisplayName = Util.truncateString(largestCheer?.displayName, minTruncateString);

    return (
        <AnimatedLatestEventTemplate
            title={largestCheerTitle}
            name={largestCheer ? latestDisplayName : '-'}
            icon={<GiPartyHat size={iconSize} color={iconColor} />}
            style={props.style}
        ></AnimatedLatestEventTemplate>
    );
};
