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
    shelve: (bookId) => `${BASE_URL}/books/${bookId}/shelve`
};
  register: () => `${BASE_URL}/users/register`,
  signin: () => `${BASE_URL}/users/signin`,
  getUsers: () => `${BASE_URL}/users/`,
  category: () => `${BASE_URL}/category/`,
  token: () => mySessionStorage.getToken(),
};

const booksURL = {
  books: `${BASE_URL}/books`,
};

const categoriesURL = {
  getAllCategories: `${BASE_URL}/category`,
};

const authorsURL = {
  getAllAuthors: `${BASE_URL}/authors`,
};

export { booksURL, categoriesURL, authorsURL };
