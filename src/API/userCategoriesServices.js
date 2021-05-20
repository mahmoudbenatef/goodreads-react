import axios from 'axios';
import { API, userCategoriesURL, userCategoryBooksURL } from "./urls";

export const userCategoriesServices =  {
  userCategories() {
    return axios.get( userCategoriesURL.getAllCategories, {
        headers: {
            'Authorization': `JWT ${API.token()}`
        }
    });
  },

  categoryBooks(categoryId) {
    return axios.get( userCategoryBooksURL.getCategoryBooks(categoryId), {
        headers: {
            'Authorization': `JWT ${API.token()}`
        }
    });
  },

};