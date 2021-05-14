import axios from "axios";
import { categoriesURL } from "./urls";
export default {
  getAllCategories() {
    return axios.get(categoriesURL.getAllCategories);
  },
};
