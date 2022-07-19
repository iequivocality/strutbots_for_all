import Property from './Property';
import { WidgetSettings } from './WidgetSettings';

export interface CreditsSettings extends WidgetSettings {
    headerColor?: string;
    headerFontSize?: string;
    headerFontWeight?: number;

    namesColor?: string;
    namesFontSize?: string;
    namesFontWeight?: number;

    textAlign?: Property.TextAlign;
}
