import { api } from "./urls";
export const BookService =  {
  rate(userId, bookId, rating) {
    return api.post(`/books/${bookId}/rate`, { user: userId, rating: rating });
  },
};
