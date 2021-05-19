import axios from 'axios';
import { API, userBooksURL } from "./urls";

export const UserBookServices =  {
  userBooks(userId, page, limit, filter) {
    return axios.get( userBooksURL.getBooks(userId) + `?page=${page}&limit=${limit}&filter=${filter}`, {
        headers: {
            'Authorization': `JWT ${API.token()}`
        }
    });
  },
};