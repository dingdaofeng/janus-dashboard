import history from '../configuration/history';
import client, { getAccessToken, setAccessToken } from '../api';
import {
    CHECK_LOGGED_STATUS,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
} from '../constants';
import axios from 'axios';

// const credentials = {
//     client: {
//         id: '<client-id>',
//         secret: '<client-secret>',
//     },
//     auth: {
//         tokenHost: 'https://api.oauth.com',
//     }
// };
// const oauth2 = require('simple-oauth2').create(credentials);
// console.error('OAUTH2', oauth2)

var OAuth = require('@zalando/oauth2-client-js');
var google = new OAuth.Provider({
    id: 'google',   // required
    authorization_url: 'https://google.com/auth' // required
});

var ClientOAuth2 = require('client-oauth2');

var githubAuth = new ClientOAuth2({
    clientId: 'fab6013f6101e65a811c',
    clientSecret: '06d760766b6c4d259cf0fee80cba7116f6f2a3da',
    accessTokenUri: 'https://github.com/login/oauth/access_token',
    authorizationUri: 'https://github.com/login/oauth/authorize',

    redirectUri: 'http://localhost:8082/auth/callback',
    //   scopes: ['notifications', 'gist']
});

// window.oauth2Callback = function (uri) {
//     githubAuth.token
//         .getToken(uri)
//         .then(function (user) {
//             console.log(user); //=> { accessToken: '...', tokenType: 'bearer', ... }

//             // Make a request to the github API for the current user.
//             return popsicle.request(user.sign({
//                 method: 'get',
//                 url: 'https://api.github.com/user'
//             })).then(function (res) {
//                 console.log(res); //=> { body: { ... }, status: 200, headers: { ... } }
//             });
//         });
// };

// // Open the page in a new window, then redirect back to a page that calls our global `oauth2Callback` function.
// window.open(githubAuth.token.getUri())
export const GET_JOHNNY = () => async dispatch => {
    console.error('GET_JOHHNY');

    window.location.href='https://github.com/login/oauth/authorize?response_type=code&state=JOHNNY&client_id=fab6013f6101e65a811c';

    console.error('§2-GET_JOHHNY');
};
export const FOO = (code) => async dispatch => {
    try {
        const client = await axios.post('https://github.com/login/oauth/access_token', {
            code,
        });

        console.warn('=======');
        console.error('res', client);
        console.warn('=======');
    } catch (error) {
        console.log(error);
    }
};

export const GET_TOKEN = (code, state) => async dispatch => {
    // console.clear();
    console.error(code, state);
    try {
        const testHeaders = {
            Accept: 'application/vnd.janus.v1+json',
        };
        const b = {
            client_id: 'fab6013f6101e65a811c',
            client_secret: '06d760766b6c4d259cf0fee80cba7116f6f2a3da',
            redirect_uri: 'http://localhost:8082',
            code,
            state,
        };
        const ha = await axios({
            method: 'post',
            url: 'https://github.com/login/oauth/access_token',
            withCredentials: true,
            credentials: 'same-origin',
            mode: 'no-cors',
        }, b);
        const client2 = axios.create({
            url: 'https://github.com/login/oauth',
            // headers: testHeaders,
            data: {
                code,
                state,
            }
        });
        const response = await ha;
        console.clear();
        console.warn('>>>Response: ', response);
    } catch (error) {
        console.log(error);
    }
};

export const checkLoggedStatus = () => ({
    type: CHECK_LOGGED_STATUS,
});

export const loginRequest = () => ({
    type: LOGIN_START,
});

export const loginSuccess = () => ({
    type: LOGIN_SUCCESS,
});

export const loginFailure = () => ({
    type: LOGIN_FAILURE,
    payload: 'The login or password you entered is incorrect.'
});

export const getUserStatus = () => dispatch => {
    dispatch(checkLoggedStatus());

    if (getAccessToken()) {
        dispatch(loginSuccess());
    } else {
        // history.push('/login');
    }
};

export const loginUser = userData => async dispatch => {
    dispatch(loginRequest());

    try {
        /*
        https://github.com/login/oauth/authorize?response_type=code&client_id=07d212d657ed8f988287
        */
        // const response = await client.post('login', userData);
        const testHeaders = {
            Accept: 'application/vnd.janus.v1+json',
        };
        const client2 = axios.create({
            baseURL: 'https://github.com/login/oauth',
            headers: testHeaders,
        });
        const response = await client2.get('authorize?response_type=code&client_id=07d212d657ed8f988287');
        // const response = await client.get('auth/github/authorize?response_type=code&client_id=07d212d657ed8f988287');
        // const response = await client.get('status');

        // setAccessToken(response.data.access_token);
        // history.push('/');
        // dispatch(getUserStatus());
    } catch (error) {
        dispatch(loginFailure());
        console.log('FETCH_ENDPOINT_ERROR', 'Infernal server error', error);
    }
};
