import Property from './Property';
import { WidgetSettings } from './WidgetSettings';

export interface LatestEventsSettings extends WidgetSettings {
    latestSubscriberTitle: string;
    latestGiftBombTitle: string;
    latestGiftSubTitle: string;
    latestResubTitle: string;
    latestFollowerTitle: string;
    latestCheerTitle: string;
    latestRaiderTitle: string;
    latestHostTitle: string;
    largestCheerTitle: string;
    shownEvents: string;
    iconSize: string;
    iconColor: string;
    lineHeight: string;
    titleFontWeight: number;
    titleFontSize: string;
    titleTextTransform: Property.TextTransform;
    nameFontWeight: number;
    nameFontSize: string;
    nameTextTransform: Property.TextTransform;
    minTruncateString: number;
}
