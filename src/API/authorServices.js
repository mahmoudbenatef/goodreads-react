import axios from "axios";
import { AUTHOR_API } from "./urls";

export default {
  getAllAuthors() {
    return axios.get(AUTHOR_API.getAllAuthors());
  },
  getPopularAuthors() {
    return axios.get(AUTHOR_API.popularAuthors());
  },
};
