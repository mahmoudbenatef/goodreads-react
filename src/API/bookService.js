import axios from "axios";
import { booksURL } from "./urls";
export default {
  getAllBooks() {
    return axios.get(booksURL.books);
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
