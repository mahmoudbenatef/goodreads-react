import { mySessionStorage } from "../helper/LocalStorge";

export const BASE_URL = "http://localhost:3001";
export const API = {
  register: () => `${BASE_URL}/users/register`,
  signin: () => `${BASE_URL}/users/signin`,
  getUsers: () => `${BASE_URL}/users/`,
  category: () => `${BASE_URL}/category/`,
  token: () => mySessionStorage.getToken(),
};

export const BOOK_API = {
  rate: (bookId) => `${BASE_URL}/books/${bookId}/rate`,
  shelve: (bookId) => `${BASE_URL}/books/${bookId}/shelve`,
  popularBooks: () => `${BASE_URL}/popular/books`,
  books: () => `${BASE_URL}/books`,
};

export const CATEGORY_API = {
  popular: () => `${BASE_URL}/popular/categories`,
  rate: (bookId) => `${BASE_URL}/books/${bookId}/rate`,
  shelve: (bookId) => `${BASE_URL}/books/${bookId}/shelve`,
  getAllCategories: () => `${BASE_URL}/category`,
};
export const userBook = {
  shelve: (bookId, userId) =>
    `${BASE_URL}/userBooks/${bookId}/user/${userId}/shelve`,
};
export const AUTHOR_API = {
  popularAuthors: () => `${BASE_URL}/popular/authors`,
  getAllAuthors: () => `${BASE_URL}/authors`,
};
