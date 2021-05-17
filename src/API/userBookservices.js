import axios from 'axios';
import { API, userBooksURL } from "./urls";

export const UserBookServices =  {
  userBooks(userId) {
    return axios.get( userBooksURL.getBooks(userId), {
        headers: {
            'Authorization': `JWT ${API.token()}`
        }
    });
  },
};