import api from './api';
import { IUser, SurpriseResponse } from 'types';

export const SurpriseService = {
    getSurprise: (request: IUser) => {
        return api('/get_surprise', request) as Promise<SurpriseResponse>;
    },
};

// export const loginUser = (username: string, remember: boolean) =>
//     UsersService.login({ username }).then(({ token }) => {
//         const options = remember ? { maxAge: 2592000, path: '/' } : { path: '/' };
//         cookie.remove('jwt-key'); // can be old jwt-key without options
//         cookie.save('jwt-key', token, options);
//     });

// export const registerUser = (values: UserRegister, remember: boolean) =>
//     UsersService.register(values).then(({ token }) => {
//         const options = remember ? { maxAge: 2592000, path: '/' } : { path: '/' };
//         cookie.remove('jwt-key'); // can be old jwt-key without options
//         cookie.save('jwt-key', token, options);
//     });

// export const logoutUser = () => {
//     cookie.remove('jwt-key', { path: '/' });
// };
