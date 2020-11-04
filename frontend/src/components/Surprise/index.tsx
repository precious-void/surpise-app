import React from 'react';
import './Surprise.scss';
import { SurpriseResponse } from 'types';
import Typography from 'components/Typography';

export interface SurpriseProps {
    values: SurpriseResponse;
}

const Surprise: React.FunctionComponent<SurpriseProps> = ({ values }) => {
    const { surprise_type } = values;

    if (surprise_type === 'ChuckNorris') {
        const { message, image_url } = values;
        return (
            <div className="Surprise">
                <Typography size="h2" color="primary" className="mt-20 mb-20">
                    Chuck Norrris Joke
                </Typography>

                <div className="ChuckNorris__wrapper">
                    <Typography size="h3" color="primary" className="mb-20">
                        {message}
                    </Typography>

                    <img src={image_url} alt="Chuck Norrris Joke" />
                </div>
            </div>
        );
    }

    if (surprise_type === 'TrumpQoute') {
        const { message, image_url } = values;
        return (
            <div className="Surprise">
                <Typography size="h2" color="primary" className="mt-20 mb-20">
                    Donald Trump Qoute
                </Typography>

                <div className="TrumpQoute__wrapper">
                    <div className="TrumpQoute_image">
                        <Typography size="h3" color="primary" className="TrumpQoute__text">
                            {message}
                        </Typography>

                        <img src={image_url} alt="Chuck Norrris Joke" />
                    </div>
                </div>
            </div>
        );
    }

    const { message, image_url } = values;
    return (
        <div className="Surprise">
            <Typography size="h2" color="primary" className="mt-20 mb-20">
                Meme
            </Typography>

            <div className="Meme__wrapper">
                <Typography size="h3" color="primary" className="mt-20 mb-20">
                    «{message}»
                </Typography>

                <img src={image_url} alt="Chuck Norrris Joke" />
            </div>
        </div>
    );
};

export default Surprise;
