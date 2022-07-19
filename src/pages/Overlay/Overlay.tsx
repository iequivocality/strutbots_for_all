import { SettingsContext } from 'providers';
import React, { useContext } from 'react';
import LatestEvents from 'widgets/latest/LatestEvents';
import Chat from '../../widgets/chat';

export const Overlay = () => {
    const settingsContext = useContext(SettingsContext);

    return (
        <div id="overlay">
            <Chat
                chatSettings={settingsContext.overlaySettings.normalChat}
            ></Chat>
            <LatestEvents></LatestEvents>
        </div>
    );
};
