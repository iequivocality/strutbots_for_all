import { SBTwitchMessage } from '@models/sb';
import { useTwitchCheers } from 'hooks/bot';
import useLocalStorage from 'hooks/useLocalStorage';
import { LatestEventTypes } from '.';

export const useTwitchCheersWithLargest = () => {
    const [latestCheer, setLatestCheer] =
        useLocalStorage<SBTwitchMessage | null>(LatestEventTypes.Cheer, null);

    const [largestCheer, setLargestCheer] =
        useLocalStorage<SBTwitchMessage | null>(
            LatestEventTypes.LargestCheer,
            null
        );

    useTwitchCheers((cheerMessage: SBTwitchMessage) => {
        if (largestCheer) {
            if (cheerMessage?.bits > largestCheer?.bits) {
                setLargestCheer(cheerMessage);
            }
        } else {
            setLargestCheer(cheerMessage);
        }

        setLatestCheer(cheerMessage);
    });

    return [largestCheer, latestCheer] as const;
};
