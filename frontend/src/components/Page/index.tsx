import React from 'react';

import Typography from 'components/Typography';
import './Page.scss';

export interface PageProps {
    title?: string;
}

const Page: React.FunctionComponent<PageProps> = ({ title, children }) => {
    return (
        <div className="Page">
            <div className="Page__container">
                {title && (
                    <Typography size="h1" color="primary">
                        {title}
                    </Typography>
                )}
                {children}
            </div>
        </div>
    );
};

export default Page;
