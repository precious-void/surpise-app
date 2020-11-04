import React, { useState } from 'react';
import './Main.scss';
import { SurpriseResponse } from 'types';

import Page from 'components/Page';
import Typography from 'components/Typography';
import Surprise from 'components/Surprise';
import Form from 'components/Form';

const Main = () => {
    const [surprise, setSurprise] = useState<SurpriseResponse>();

    const gotSurprise = (values: SurpriseResponse) => {
        setSurprise(values);
    };

    return (
        <Page>
            {!surprise ? (
                <>
                    <Typography size="h1">Main</Typography>
                    <Typography size="body1" color="primary">
                        Get the best surprise in your life!
                    </Typography>
                    <Form setSurprise={gotSurprise} />
                </>
            ) : (
                <Surprise values={surprise} />
            )}
        </Page>
    );
};

export default Main;
