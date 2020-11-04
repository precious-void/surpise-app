import { Schema, Document, model } from 'mongoose';
import { UserData } from 'types';

const UserDataSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        birthDate: {
            type: Date,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        surprise_type: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

UserDataSchema.set('toJSON', {
    virtuals: true,
});

export type IUser = Omit<UserData, '_id' | 'surprise_type'>;
export interface IUserData extends IUser, Document {}
export const UserDataModel = model<IUserData>('Surprise', UserDataSchema);
