const BASE_URL:string = import.meta.env.VITE_API_BASE_URL;

export const config = {
    API_URL: BASE_URL,
    API_ROUTES: {
        AUTH: BASE_URL + '/auth/login/',
        REGISTER: BASE_URL + '/auth/register/',
        DEVS: BASE_URL + '/devs/',
    }
};