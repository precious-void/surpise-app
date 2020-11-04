import 'mocha';
import { expect } from 'chai';
import dotenv from 'dotenv';
import { getSurpriseData } from '../src/services/externalService';
import { IUser } from '../src/models/userData';

dotenv.config({ path: '../.env' });

const ChuckNorrisMock: IUser = {
    name: 'Quentine',
    birthDate: new Date(1998, 3, 22),
    country: 'Russia',
};

const TrumpMock: IUser = {
    name: 'Quentin',
    birthDate: new Date(2001, 4, 23),
    country: 'Russia',
};

const MemeMock: IUser = {
    name: 'Artem Datz',
    birthDate: new Date(2001, 4, 23),
    country: 'Russia',
};

const RandomUser: IUser = {
    name: 'Potter',
    birthDate: new Date(2001, 4, 23),
    country: 'Russia',
};

describe('Surprise Service Testing', () => {
    it('ChuckNorris User Birthdate 1998', async () => {
        const response = await getSurpriseData(ChuckNorrisMock);
        expect(response.surprise_type).to.equal('ChuckNorris');

        expect(response.message).to.not.be.an('undefined');
        expect(response.image_url).to.not.be.an('undefined');
    });

    it('ChuckNorris User Birthdate 2000', async () => {
        ChuckNorrisMock.birthDate = new Date(2000, 3, 22);

        const response = await getSurpriseData(ChuckNorrisMock);
        expect(response.surprise_type).to.equal('ChuckNorris');

        expect(response.message).to.not.be.an('undefined');
        expect(response.image_url).to.not.be.an('undefined');
    });

    it('Default Trump User', async () => {
        const response = await getSurpriseData(TrumpMock);
        expect(response.surprise_type).to.equal('TrumpQoute');

        expect(response.message).to.not.be.an('undefined');
        expect(response.image_url).to.not.be.an('undefined');
    });

    it('Not Trump User start with A', async () => {
        TrumpMock.name = 'Artem';
        const response = await getSurpriseData(TrumpMock);
        expect(response.surprise_type).to.not.equal('TrumpQoute');

        expect(response.message).to.not.be.an('undefined');
        expect(response.image_url).to.not.be.an('undefined');
    });

    it('Not Trump User start with Z', async () => {
        TrumpMock.name = 'Zorro';
        const response = await getSurpriseData(TrumpMock);
        expect(response.surprise_type).to.not.equal('TrumpQoute');

        expect(response.message).to.not.be.an('undefined');
        expect(response.image_url).to.not.be.an('undefined');
    });

    it('Meme User', async () => {
        MemeMock.name = 'Artem';
        const response = await getSurpriseData(MemeMock);
        expect(response.surprise_type).to.equal('Meme');

        expect(response.message).to.not.be.an('undefined');
        expect(response.image_url).to.not.be.an('undefined');
    });

    it('Not Meme User start with Q', async () => {
        MemeMock.name = 'Quentine';
        const response = await getSurpriseData(MemeMock);
        expect(response.surprise_type).to.not.equal('Meme');

        expect(response.message).to.not.be.an('undefined');
        expect(response.image_url).to.not.be.an('undefined');
    });

    it('Random user', async () => {
        RandomUser.name = 'Potter';
        const response = await getSurpriseData(RandomUser);
        expect(response.surprise_type).to.not.equal('ChuckNorris');

        expect(response.message).to.not.be.an('undefined');
        expect(response.image_url).to.not.be.an('undefined');
    });
});
