const BASE_URL =process.env.NEXT_PUBLIC_APP_ENV !== 'production' ? 'http://127.0.0.1:8000/api' : 'http://cornea-ai.com/api';

export default {
    loginEndpoint: `${BASE_URL}/auth/login`,
    registerEndpoint: `${BASE_URL}/auth/register`,
    storageTokenKeyName: 'accessToken',
    userInfo: `${BASE_URL}/user/info`,
}
