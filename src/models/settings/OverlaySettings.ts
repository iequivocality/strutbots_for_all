import { ChatSettings } from './ChatSettings';
import { CreditsSettings } from './CreditsSettings';
import { LatestEventsSettings } from './LatestEventsSettings';

export interface OverlaySettings {
    normalChat: ChatSettings;
    credits: CreditsSettings;
    latestEvents: LatestEventsSettings;
}
