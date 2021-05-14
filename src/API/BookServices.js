import axios from 'axios';
import { BOOK_API } from "./urls";

export const BookService =  {
  rate(userId, bookId, rating) {
    return axios.post( BOOK_API.rate(bookId), { user: userId, rating: rating });
  },
  shelve(userId, bookId, shelf) {
    return axios.post(BOOK_API.shelve(bookId), { user: userId, shelf: shelf });
  }
};
