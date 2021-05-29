import axios from "axios";
import { BOOK_API } from "./urls";
export default {
  getAllBooks(params) {
    return axios.get(BOOK_API.books(), { params });
  },

  getBookById(bookId) {
    return axios.get(`${BOOK_API.books()}/${bookId}`);
  },
  async addNewBook(book) {
    try {
      return await axios.post(BOOK_API.books(), book);
    } catch (error) {
      return error.response;
    }
  },

  async deleteBook(bookId) {
    return await axios.delete(`${BOOK_API.books()}/${bookId}`);
  },

  async editBook(bookId, book) {
    try {
      return await axios.patch(`${BOOK_API.books()}/${bookId}`, book);
    } catch (error) {
      return error.response;
    }
  },
  rate(userId, bookId, rating) {
    return axios.post(BOOK_API.rate(bookId), { user: userId, rating: rating });
  },
  review(userId, bookId, review) {
    return axios.post(BOOK_API.review(bookId), {
      bookId,
      userId,
      review,
    });
  },
  deleteReview(reviewId, bookId) {
    return axios.delete(BOOK_API.review(bookId), { data: { reviewId } });
  },
  shelve(userId, bookId, shelf) {
    return axios.post(BOOK_API.shelve(bookId), { user: userId, shelf: shelf });
  },
  getPopularBooks() {
    return axios.get(BOOK_API.popularBooks());
  },
  search(value, skip) {
    return axios.get(BOOK_API.search(value, skip));
  },
};
