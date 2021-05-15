import axios from 'axios';
import { CATEGORY_API } from "./urls";

export const CategoryService =  {
  getPopular() {
    return axios.get( CATEGORY_API.popular());
  }
};
