import { SBGiftedSub } from '@models/sb';
import { useTwitchGiftSub } from 'hooks/bot';
import useLocalStorage from 'hooks/useLocalStorage';
import { SettingsContext } from 'providers';
import React, { useContext } from 'react';
import {
    AnimatedLatestEventTemplate,
    LatestEventProps,
    LatestEventTypes,
} from '.';
import { BsGiftFill } from 'react-icons/bs';
import Util from 'Util';

export const LatestGiftSub: React.FC<LatestEventProps> = (
    props: LatestEventProps
) => {
    const settings = useContext(SettingsContext);
    const { latestGiftSubTitle, iconSize, iconColor, minTruncateString } =
        settings.overlaySettings.latestEvents;

    const [latestGiftSub, setLatestGiftSub] = useLocalStorage<string>(
        LatestEventTypes.GiftSub,
        '-'
    );

    useTwitchGiftSub((channelSub: SBGiftedSub) => {
        setLatestGiftSub(channelSub.displayName);
    });

    const latestDisplayName = Util.truncateString(latestGiftSub, minTruncateString);

    return (
        <AnimatedLatestEventTemplate
            title={latestGiftSubTitle}
            name={latestDisplayName}
            icon={<BsGiftFill size={iconSize} color={iconColor} />}
            style={props.style}
        ></AnimatedLatestEventTemplate>
    );
};
