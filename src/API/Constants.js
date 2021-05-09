
export const BASE_URL = "http://localhost:3001";
export const API = {
    register: () => `${BASE_URL}/users/register`,
    signin: (id) => `${BASE_URL}/users/signin`,
    getUsers: (userId) => `${BASE_URL}/users/`,
};
