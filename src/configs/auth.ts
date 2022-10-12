console.log(process.env.APP_ENV);
const BASE_URL = process.env.APP_ENV !== 'production' ? 'http://127.0.0.1:8000/api' : 'http://127.0.0.1:8000/api';


export default {
    auth: `${BASE_URL}/auth`,
    registerEndpoint: `${BASE_URL}/auth`,
    storageTokenKeyName: 'accessToken',
    userInfo: '/auth/userInfo',
}

// export default {
//   // meEndpoint: '/auth/me',
//   meEndpoint: 'http://127.0.0.1:8000/api/auth',
//   // loginEndpoint: '/jwt/login',
//   //loginEndpoint: 'http://127.0.0.1:8000/api/auth',
//   registerEndpoint: '/jwt/register',
//   storageTokenKeyName: 'accessToken'
// }





