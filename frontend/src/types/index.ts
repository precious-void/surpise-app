export type SurpriseTypes = 'ChuckNorris' | 'TrumpQoute' | 'Meme';

export interface UserData {
    name: string;
    birthDate: string;
    country: string;
    surprise_type: SurpriseTypes;
}

export type IUser = Omit<UserData, 'surprise_type'>;

export interface SurpriseResponse {
    surprise_type: SurpriseTypes;
    image_url?: string;
    message?: string;
}
