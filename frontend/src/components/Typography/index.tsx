import React from 'react';
import classNames from 'classnames';

import './Typography.scss';

export type TitleType = 'h1' | 'h2' | 'h3' | 'h4' | 'body1' | 'body2' | 'label';

export interface TextProps {
    size: TitleType;
    className?: string;
    style?: React.CSSProperties;
    top?: number;
    bottom?: number;
    forceSpan?: boolean;
    color?: 'primary' | 'main';
    htmlFor?: string;
}

const Typography: React.FC<TextProps> = ({
    size,
    className,
    style,
    children,
    top,
    bottom,
    forceSpan,
    color,
    htmlFor,
}) => {
    if (!color) color = 'main';

    const props = {
        className: classNames('typography', className, size, `${color}-color`),
        style: {
            ...style,
            ...(bottom ? { marginBottom: bottom } : {}),
            ...(top ? { marginTop: top } : {}),
        },
    };

    if (size === 'h1') return <h1 {...props}>{children}</h1>;
    if (size === 'h2') return <h2 {...props}>{children}</h2>;
    if (size === 'h3') return <h3 {...props}>{children}</h3>;
    if (size === 'h4') return <h4 {...props}>{children}</h4>;

    const P = forceSpan ? 'span' : 'p';
    if (size === 'body1') return <P {...props}>{children}</P>;
    if (size === 'body2') return <P {...props}>{children}</P>;
    if (size === 'label')
        return (
            <label htmlFor={htmlFor} {...props}>
                {children}
            </label>
        );

    return <P className={className}>{children}</P>;
};

export default Typography;
