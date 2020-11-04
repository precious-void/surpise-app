import React, { useEffect, useState } from 'react';
import './Statistics.scss';
import { StatisticsResponse } from 'types';

import Page from 'components/Page';
import { SurpriseService } from 'api/surprise-service';
import Typography from 'components/Typography';
const Statistics = () => {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState<string>();
    const [data, setData] = useState<StatisticsResponse>();

    useEffect(() => {
        SurpriseService.getStatisticts()
            .then((res) => {
                setData(res);
                setLoaded(true);
            })
            .catch((err) => {
                setError(err.toString());
                setLoaded(true);
            });
    }, []);

    return (
        <Page title="Statistics">
            {loaded ? (
                error ? (
                    <div className="mt-12 mb-12">
                        <Typography size="body1" style={{ color: 'red' }}>
                            {error}
                        </Typography>
                    </div>
                ) : (
                    'Statisticas'
                )
            ) : (
                <Typography size="body1">Loading...</Typography>
            )}
        </Page>
    );
};

export default Statistics;
