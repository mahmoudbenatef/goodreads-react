import  {mySessionStorage} from "../helper/LocalStorge"

export const BASE_URL = "http://localhost:3001";
export const API = {
    register: () => `${BASE_URL}/users/register`,
    signin: () => `${BASE_URL}/users/signin`,
    getUsers: () => `${BASE_URL}/users/`,
    category:()=> `${BASE_URL}/category/`,
    token:()=> mySessionStorage.getToken()

};
