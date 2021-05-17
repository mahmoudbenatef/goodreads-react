import axios from "axios";
import { CATEGORY_API } from "./urls";

export default {
  getAllCategories() {
    return axios.get(CATEGORY_API.getAllCategories());
  },  getPopular() {
    return axios.get( CATEGORY_API.popular());
  }
};
