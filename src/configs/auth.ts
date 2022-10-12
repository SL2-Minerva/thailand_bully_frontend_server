const BASE_URL = process.env.APP_ENV !== 'production' ? 'http://127.0.0.1:8000/api' : 'http://cornea-ai.com/api';


// export default {
//     auth: `${BASE_URL}/auth`,
//     registerEndpoint: `${BASE_URL}/auth`,
//     storageTokenKeyName: 'accessToken',
//     userInfo: '/auth/userInfo',
// }



export default {
  meEndpoint: '/auth/me',
  loginEndpoint: '/jwt/login',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken'
}






