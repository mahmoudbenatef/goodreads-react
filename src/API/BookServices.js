import { api } from "./urls";
export const BookService =  {
  rate(userId, bookId, rating) {
    return api.post(`/books/${bookId}/rate`, { user: userId, rating: rating });
  },
  shelve(userId, bookId, shelf) {
    return api.post(`/books/${bookId}/shelve`, { user: userId, shelf: shelf });
  }
};
