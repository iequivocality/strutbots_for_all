import {
    animated,
    config,
    SpringRef,
    useChain,
    useSpring,
    useSpringRef,
    useTrail,
} from '@react-spring/web';
import useTimeout from 'hooks/useTimeout';
import React, {
    Children,
    FC,
    ReactNode,
    useEffect,
    useRef,
    useState,
} from 'react';
import { useLocation, useParams } from 'react-router-dom';

export const VideoShoutout = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const search = useLocation().search;
    const [show, setShow] = useState(true);
    const user = new URLSearchParams(search).get('user');
    const image = new URLSearchParams(search).get('image');
    const thumbnailUrl = new URLSearchParams(search).get('thumbnail_url');
    const lastGame = new URLSearchParams(search).get('last_game');

    const showContainerApi = useSpringRef();
    const { left } = useSpring({
        ref: showContainerApi,
        from: { left: '1920px' },
        to: { left: '1440px' },
        reverse: !show,
    });

    console.log('thumbnailUrl', thumbnailUrl);

    const profileImage = (user: string, image: string) => (
        <div className="absolute vso-profile-image top-0 left-0 z-40">
            <img src={image} alt={user} />
        </div>
    );

    const showDataApi = useSpringRef();
    const showData = useSpring({
        ref: showDataApi,
        from: { right: '-100%' },
        to: { right: '0%' },
        reverse: !show,
    });

    const showVideoApi = useSpringRef();
    const { height } = useSpring({
        ref: showVideoApi,
        from: { height: '0px' },
        to: { height: '270px' },
        reverse: !show,
    });

    useChain(
        show
            ? [showContainerApi, showDataApi, showVideoApi]
            : [showVideoApi, showDataApi, showContainerApi],
        show ? [0, 0.375, 1] : [0, 0.75, 1],
        1000
    );

    return (
        <div className="vso-wrapper">
            <animated.div className="absolute vso" style={{ left: left }}>
                <div className="relative flex flex-col flex-end vso-video">
                    <animated.div
                        className="absolute bottom-0 left-0 overflow-hidden"
                        style={{ height: height }}
                    >
                        {thumbnailUrl ? (
                            <animated.video
                                ref={videoRef}
                                style={{ height: height }}
                                autoPlay
                                src={thumbnailUrl.replace(
                                    /(.*)-preview-.*/,
                                    '$1.mp4'
                                )}
                                onEnded={() => setShow(false)}
                            ></animated.video>
                        ) : null}
                    </animated.div>
                </div>
                <div className="relative left-0 z-30 vso-profile">
                    {user && image ? profileImage(user, image) : null}
                    <div className="flex flex-col justify-center items-end vso-data">
                        <animated.div style={showData} className="relative">
                            Shoutout to{' '}
                            <span className="user emphasis">{user}</span>
                        </animated.div>
                        <animated.div style={showData} className="relative">
                            who last streamed
                        </animated.div>
                        <animated.div
                            style={showData}
                            className="relative emphasis"
                        >
                            {lastGame}
                        </animated.div>
                    </div>
                </div>
            </animated.div>
        </div>
    );
};
