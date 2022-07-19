import React, { StrictMode } from 'react';

import { BrowserRouter, Route, RouteProps, Routes } from 'react-router-dom';

import SocketProvider from './providers/SocketProvider';
import SettingsProvider from 'providers/SettingsProvider';
import DefaultTheme from 'settings/DefaultSettings';

import './index.scss';
import { Credits, Overlay, VideoShoutout } from 'pages';

const routes: RouteProps[] = [
    {
        path: '/',
        element: <Overlay />,
    },
    {
        path: 'credits',
        element: <Credits />,
    },
    {
        path: 'overlay',
        element: <Overlay />,
    },
    {
        path: 'shoutout',
        element: <VideoShoutout />,
    },
];

const App = () => {
    return (
        // <StrictMode>
        <SocketProvider>
            <SettingsProvider overlaySettings={DefaultTheme}>
                <BrowserRouter>
                    <Routes>
                        {routes.map((r) => (
                            <Route {...r} key={r.path}></Route>
                        ))}
                    </Routes>
                </BrowserRouter>
            </SettingsProvider>
        </SocketProvider>
        // </StrictMode>
    );
};

export default App;
