
export const BASE_URL = "http://localhost:3000";
export const API = {
    register: () => `${BASE_URL}/users/register`,
    signin: () => `${BASE_URL}/users/signin`,
    getUsers: () => `${BASE_URL}/users/`,
    category:()=> `${BASE_URL}/category/`,

};
