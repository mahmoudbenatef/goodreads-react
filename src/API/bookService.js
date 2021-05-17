import axios from "axios";
import { booksURL } from "./urls";
export default {
  getAllBooks(params) {
    return axios.get(booksURL.books, { params });
  },

  async addNewBook(book) {
    try {
      return await axios.post(booksURL.books, book);
    } catch (error) {
      return error.response;
    }
  },

  async deleteBook(bookId) {
    return await axios.delete(`${booksURL.books}/${bookId}`);
  },

  async editBook(bookId, book) {
    try {
      return await axios.patch(`${booksURL.books}/${bookId}`, book);
    } catch (error) {
      return error.response;
    }
  },
};
