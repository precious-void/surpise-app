import { Request, Response } from 'express';
import { SurpriseResponse, StatisticsResponse } from 'types';

import { IUser, UserDataModel } from '../models/userData';
import { getSurpriseData } from './externalService';
import { getAverageAge, getCountriesDistribution, getDistribution } from './dataBaseServices';

// Get Surprise!!!
export const getSurprise = async (request: Request, response: Response): Promise<Response<SurpriseResponse>> => {
    const { name, birthDate, country } = request.body;

    const userMetaData: IUser = {
        name: name as string,
        birthDate: new Date(birthDate),
        country: country as string,
    };

    try {
        const surpriseData = await getSurpriseData(userMetaData);
        console.log(surpriseData);

        const user = new UserDataModel({
            name: name as string,
            birthDate: birthDate as Date,
            country: country as string,
            surprise_type: surpriseData.surprise_type,
        });

        await user.save();

        return response.json(surpriseData);
    } catch {
        return response.status(500).send('Internal server error');
    }
};

// Get statistics
export const getStatistics = async (request: Request, response: Response): Promise<Response<StatisticsResponse>> => {
    try {
        const averageAge = await getAverageAge();
        const distribution = await getDistribution();
        const countriesDistribution = await getCountriesDistribution();

        // Get Average Age
        return response.json({ averageAge, distribution, countriesDistribution });
    } catch {
        return response.status(500).send('Internal server error');
    }
};
