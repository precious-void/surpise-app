import React from 'react';
import './StatisticsComponent.scss';
import { StatisticsResponse, Distribution } from 'types';
import Typography from 'components/Typography';

interface StatisticsProps {
    values: StatisticsResponse;
}

const StatisticsComponent: React.FunctionComponent<StatisticsProps> = ({ values }) => {
    const { averageAge, distribution, countriesDistribution } = values;

    return (
        <div className="StatisticsComponent">
            <div className="StatisticsComponent__parameter">
                <Typography size="body1" className="mr-8">
                    Average age:
                </Typography>
                <Typography size="body1" color="primary">
                    {averageAge}
                </Typography>
            </div>
            <Typography size="h4" className="mt-20" color="primary">
                Distribution between response types
            </Typography>

            <div className="StatisticsComponent__parameter">
                <Typography size="body1" className="mr-8">
                    Memes:
                </Typography>
                <Typography size="body1" color="primary">
                    {distribution.Meme}
                </Typography>
            </div>

            <div className="StatisticsComponent__parameter">
                <Typography size="body1" className="mr-8">
                    Trymp Qoutes:
                </Typography>
                <Typography size="body1" color="primary">
                    {distribution.TrumpQoute}
                </Typography>
            </div>

            <div className="StatisticsComponent__parameter">
                <Typography size="body1" className="mr-8">
                    ChuckNorris jokes:
                </Typography>
                <Typography size="body1" color="primary">
                    {distribution.ChuckNorris}
                </Typography>
            </div>

            <Typography size="h4" className="mt-20" color="primary">
                Distribution between countries
            </Typography>

            {Object.keys(countriesDistribution).map((item, i) => (
                <div className="StatisticsComponent__parameter">
                    <Typography size="body1" className="mr-8">
                        {item}:
                    </Typography>
                    <Typography size="body1" color="primary">
                        {countriesDistribution[item]}
                    </Typography>
                </div>
            ))}
        </div>
    );
};

export default StatisticsComponent;
