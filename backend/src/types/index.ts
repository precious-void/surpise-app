export type SurpriseTypes = 'ChuckNorris' | 'TrumpQoute' | 'Meme';

// Native Objects
export interface UserData {
    _id: string;
    name: string;
    birthDate: Date;
    country: string;
    surprise_type: SurpriseTypes;
}

export interface SurpriseResponse {
    surprise_type: SurpriseTypes;
    image_url?: string;
    message?: string;
}

// External API's obejcts
export interface ChuckNorris {
    icon_url: string;
    id: string;
    url: string;
    value: string;
}

export interface TrumpQuote {
    message: string;
    nickname: string;
    nlp_attributes: {
        pronoun: string;
        quote_structure: string[];
    };
}

export interface TrumpBackground {
    id: number;
    url: string;
    large_url: string;
    source_id: number;
    copyright: string;
    site: string;
}

export interface Meme {
    id: string;
    name: string;
    url: string;
    width: number;
    height: number;
    box_count: number;
}

export interface MemesList {
    success: boolean;
    data: {
        memes: Meme[];
    };
}

export interface Distribution {
    Meme: number;
    TrumpQoute: number;
    ChuckNorris: number;
}

export interface CountriesDistribution {
    [country: string]: number;
}

export interface StatisticsResponse {
    averageAge: number;
    distribution: Distribution;
    countriesDistribution: CountriesDistribution;
}
