import { SBEventType } from 'hooks/useSocketSubscribe';

export interface Alert {
    event: SBEventType;
    headline: string;
    subHeadline: string;
    imageSource?: string;
    audioSource?: string;
    backgroundColor?: string;
}
