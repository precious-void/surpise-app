import { ChuckNorris, SurpriseResponse, TrumpQuote, TrumpBackground, MemesList } from 'types';
import axios from 'axios';
import cachedApi from './cachedApi';
import { IUser } from '../models/userData';

// API URL's
const chuckNorrisUrl = 'https://api.chucknorris.io/jokes/random';
const trumpQouteUrl = 'https://api.whatdoestrumpthink.com/api/v1/quotes/personalized';
const trumpBackgroundUrl = 'http://www.splashbase.co/api/v1/images';
const memesUrl = 'https://api.imgflip.com/get_memes';

// Caching special for memes list, cause it's huge
const memesCachedApi = cachedApi(memesUrl);

// Typing for recieving random (or not really) request
type SurprisesFunctions = typeof getChuckNorris | typeof getTrumpQoute | typeof getMeme;

// Get Chuck Norris
export const getChuckNorris = (): Promise<SurpriseResponse> =>
    axios.get<ChuckNorris>(chuckNorrisUrl).then(({ data }) => ({
        surprise_type: 'ChuckNorris',
        image_url: data.icon_url,
        message: data.value,
    }));

// Get Trump Motivation Qoute and Background for this qoute
export const getTrumpQoute = ({ name, birthDate }: IUser): Promise<SurpriseResponse> => {
    const qouteRequest = () => axios.get<TrumpQuote>(`${trumpQouteUrl}?q=${name}`);
    const backgroundRequest = () => axios.get<TrumpBackground>(`${trumpBackgroundUrl}/${birthDate.getDate()}`);

    return Promise.all([qouteRequest(), backgroundRequest()]).then(([qouteResponse, backgroundResponse]) => {
        const qoute = qouteResponse.data;
        const background = backgroundResponse.data;

        return {
            surprise_type: 'TrumpQoute',
            message: qoute.message,
            image_url: background.url,
        };
    });
};

// Get Meme
export const getMeme = ({ name }: IUser): Promise<SurpriseResponse> =>
    memesCachedApi.get<MemesList>(memesUrl).then(({ data }) => {
        const n = name.replace(/\s/g, '').length;

        const memesList = data.data.memes;
        const memeByNameLength = memesList[n];

        return {
            surprise_type: 'Meme',
            image_url: memeByNameLength.url,
            message: memeByNameLength.name,
        };
    });

export const getSurpriseData = async (userData: IUser): Promise<SurpriseResponse> => {
    const availableSurprises: SurprisesFunctions[] = [];

    if (userData.birthDate.getFullYear() <= 2000) {
        availableSurprises.push(getChuckNorris);
    } else if (!['a', 'z'].includes(userData.name[0].toLowerCase())) {
        availableSurprises.push(getTrumpQoute);
    }

    if (userData.name[0].toLowerCase() !== 'q') {
        availableSurprises.push(getMeme);
    }

    return (availableSurprises.length > 1
        ? availableSurprises[Math.floor(Math.random() * availableSurprises.length)]
        : availableSurprises[0])(userData);
};
