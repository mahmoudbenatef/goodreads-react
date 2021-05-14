import axios from "axios";
import { booksURL } from "./urls";
export default {
  getAllBooks() {
    return axios.get(booksURL.getAllBooks);
  },
  async addNewBook(book) {
    try {
      return await axios.post(booksURL.addNewBook, book);
    } catch (error) {
      return error.response;
    }
  },

  async deleteBook(bookId) {
    return await axios.delete(`${booksURL.deleteBook}/${bookId}`);
  },
};
