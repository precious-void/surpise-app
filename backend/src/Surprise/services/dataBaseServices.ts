import { UserDataModel } from '../models/userData';
import { Distribution, CountriesDistribution } from 'types';

// Get Average Age
export const getAverageAge = async (): Promise<number> => {
    const averageAgeResponse = await UserDataModel.aggregate([
        {
            $group: {
                _id: null,
                average_age: {
                    $avg: {
                        $subtract: [
                            {
                                $year: new Date(),
                            },
                            {
                                $year: '$birthDate',
                            },
                        ],
                    },
                },
            },
        },
    ]);

    const averageAge = Math.floor(averageAgeResponse[0].average_age);
    console.log(averageAge);
    return averageAge;
};

// Get Distribution
export const getDistribution = async (): Promise<Distribution> => {
    const distributionResponse = await UserDataModel.aggregate([
        {
            $group: {
                _id: '$surprise_type',
                count: { $sum: 1 },
            },
        },
    ]);

    const distribution = distributionResponse.reduce((agg, item) => {
        agg[item._id] = item.count;
        return agg;
    }, {});

    return distribution;
};

// Get Countries Distribution
export const getCountriesDistribution = async (): Promise<CountriesDistribution> => {
    const distributionResponse = await UserDataModel.aggregate([
        {
            $group: {
                _id: '$country',
                count: { $sum: 1 },
            },
        },
        { $sort: { count: -1 } },
    ]);

    const distribution = distributionResponse.reduce((agg, item) => {
        agg[item._id] = item.count;
        return agg;
    }, {});

    return distribution;
};
