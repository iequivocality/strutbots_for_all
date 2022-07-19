import Property from './Property';
import { WidgetSettings } from './WidgetSettings';

export interface ChatSettings extends WidgetSettings {
    backgroundColor?: string;
    borderRadius?: string;

    messageBackgroundColor?: string;
    messageBorderRadius?: string;
    messageLineHeight?: string;

    vipBackgroundColor?: string;
    moderatorBackgroundColor?: string;
    broadcasterBackgroundColor?: string;

    badgeSize?: string;
    color?: string;

    verticalMargin?: string;

    usernameFontSize?: string;
    usernameTextTransform?: Property.TextTransform;
    usernameFontWeight?: number;

    contentFontSize?: string;
    contentFontWeight?: number;

    numberOfMessages: number;
    blockedUsers: string;
    commandPrefix: string;
}
