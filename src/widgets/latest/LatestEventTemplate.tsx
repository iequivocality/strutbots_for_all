import { AnimatedProps, animated } from '@react-spring/web';
import { SettingsContext } from 'providers';
import React, { CSSProperties, FC, ReactNode, useContext } from 'react';

interface LatestEventTemplateProps
    extends AnimatedProps<{ style: CSSProperties }> {
    title: string;
    name: string;
    icon?: ReactNode;
}

export const LatestEventTemplate: FC<LatestEventTemplateProps> = (
    props: LatestEventTemplateProps
) => {
    const settings = useContext(SettingsContext);
    const {
        lineHeight,
        titleFontWeight,
        nameFontWeight,
        titleTextTransform,
        nameTextTransform,
        titleFontSize,
        nameFontSize,
    } = settings.overlaySettings.latestEvents;
    let { title, name, icon, style } = props;

    return (
        <animated.div
            style={style}
            className="absolute flex justify-center items-center latest-event"
        >
            <div className="flex flex-auto basis-2/12 justify-center items-center icon">
                {icon}
            </div>
            <div
                className="flex flex-col flex-auto basis-10/12 justify-center items-start ml-2 details"
                style={{ lineHeight: lineHeight }}
            >
                <div
                    className="title"
                    style={{
                        fontWeight: titleFontWeight,
                        textTransform: titleTextTransform,
                        fontSize: titleFontSize,
                    }}
                >
                    {title}
                </div>
                <div
                    className="name"
                    style={{
                        fontWeight: nameFontWeight,
                        textTransform: nameTextTransform,
                        fontSize: nameFontSize,
                    }}
                >
                    {name}
                </div>
            </div>
        </animated.div>
    );
};

export const AnimatedLatestEventTemplate = LatestEventTemplate;
