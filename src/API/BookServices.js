import { API } from "./urls";
export const BookService =  {
  rate(userId, bookId, rating) {
    return API.post(`/books/${bookId}/rate`, { user: userId, rating: rating });
  },
};
