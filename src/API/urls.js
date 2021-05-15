import { mySessionStorage } from "../helper/LocalStorge";

export const BASE_URL = "http://localhost:3001";
export const API = {
    register: () => `${BASE_URL}/users/register`,
    signin: () => `${BASE_URL}/users/signin`,
    getUsers: () => `${BASE_URL}/users/`,
    category:()=> `${BASE_URL}/category/`,
    token:()=> mySessionStorage.getToken(),
};

export const BOOK_API = {
    rate: (bookId) => `${BASE_URL}/books/${bookId}/rate`,
    shelve: (bookId) => `${BASE_URL}/books/${bookId}/shelve`,
    popular: () => `${BASE_URL}/popular/books`
};

export const CATEGORY_API = {
    popular: () => `${BASE_URL}/popular/categories`,
};