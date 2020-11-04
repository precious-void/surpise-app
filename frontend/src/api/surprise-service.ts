import api from './api';
import { IUser, SurpriseResponse, StatisticsResponse } from 'types';

export const SurpriseService = {
    getSurprise: (request: IUser) => {
        return api('/get_surprise', request) as Promise<SurpriseResponse>;
    },
    getStatisticts: () => {
        return api('/get_statistics') as Promise<StatisticsResponse>;
    },
};
