import React, { ReactNode } from 'react';
import { OverlaySettings } from '@models/settings';
import DefaultOverlaySettings from 'settings/DefaultSettings';

export const SettingsContext = React.createContext<{
    overlaySettings: OverlaySettings;
}>({
    overlaySettings: DefaultOverlaySettings,
});

export interface SettingsProviderProps {
    children: ReactNode;
    overlaySettings: OverlaySettings;
}

const SettingsProvider: React.FC<SettingsProviderProps> = (
    props: SettingsProviderProps
) => {
    let { children, overlaySettings } = props;

    return (
        <SettingsContext.Provider value={{ overlaySettings: overlaySettings }}>
            {children}
        </SettingsContext.Provider>
    );
};

export default SettingsProvider;
