import { SBGiftBomb } from '@models/sb';
import { useTwitchGiftBomb } from 'hooks/bot';
import useLocalStorage from 'hooks/useLocalStorage';
import { SettingsContext } from 'providers';
import React, { useContext } from 'react';
import { BsGiftFill } from 'react-icons/bs';
import Util from 'Util';
import {
    AnimatedLatestEventTemplate,
    LatestEventProps,
    LatestEventTypes,
} from '.';

export const LatestGiftBomb: React.FC<LatestEventProps> = (
    props: LatestEventProps
) => {
    const settings = useContext(SettingsContext);
    const { latestGiftBombTitle, iconSize, iconColor, minTruncateString } =
        settings.overlaySettings.latestEvents;

    const [latestGiftBomb, setLatestGiftBomb] = useLocalStorage<string>(
        LatestEventTypes.GiftBomb,
        '-'
    );

    useTwitchGiftBomb((channelSub: SBGiftBomb) => {
        setLatestGiftBomb(channelSub.displayName);
    });

    const latestDisplayName = Util.truncateString(latestGiftBomb, minTruncateString);

    return (
        <AnimatedLatestEventTemplate
            title={latestGiftBombTitle}
            name={latestDisplayName}
            icon={<BsGiftFill size={iconSize} color={iconColor} />}
            style={props.style}
        ></AnimatedLatestEventTemplate>
    );
};
