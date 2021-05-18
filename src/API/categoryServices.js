import axios from "axios";
import { CATEGORY_API } from "./urls";

export default {
  getAllCategories() {
    return axios.get(CATEGORY_API.getAllCategories());
  },
  async getPopular() {
    try {
      return await axios.get(CATEGORY_API.popular());
    } catch (error) {
      return error.response;
    }
  },
};
