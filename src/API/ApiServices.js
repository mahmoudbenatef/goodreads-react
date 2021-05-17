import axios from "axios";
import {API, booksURL} from "./urls";

export const ApiServices = {
  register(user) {
    return axios.post(API.register(), JSON.stringify(user), {
      headers: {
        "Content-Type":
          "multipart/form-data; charset=utf-8; boundary=" +
          Math.random().toString().substr(2),
      },
      // headers: {'Content-type': 'application/json; charset=UTF-8'}
    });
  },
  signin(user) {
    return axios.post(API.signin(), JSON.stringify(user), {
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
  },

  addCategory(category) {
    return axios.post(API.category(), category, {
      headers: {
        Authorization: `JWT ${API.token()}`,
      },
    });
  },
  listCategories(queryParams) {
    if (queryParams) return axios.get(`${API.category()}${queryParams}`, {
      headers: {
        Authorization: `JWT ${API.token()}`,
      }});
    return axios.get(API.category(), {
      headers: {
        Authorization: `JWT ${API.token()}`,
      },
    });
  },
  deleteCategory(id) {
    return axios.delete(API.category() + id, {
      headers: {
        Authorization: `JWT ${API.token()}`,
      },
    });
  },

  editCategory(id, name) {
    return axios.put(
      API.category() + id,
      { label: name },

      {
        headers: {
          Authorization: `JWT ${API.token()}`,
        },
      }
    );
  },
};
