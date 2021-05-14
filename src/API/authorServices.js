import axios from "axios";
import { authorsURL } from "./urls";

export default {
  getAllAuthors() {
    return axios.get(authorsURL.getAllAuthors);
  },
};
