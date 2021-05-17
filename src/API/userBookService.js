import axios from "axios";
import {userBook} from "./urls";
import {API}from "./urls"
export const userBookService={
getShelve(bookId, userId){
    return axios.get(userBook.shelve(bookId,userId),  {
        headers: {
            Authorization: `JWT ${API.token()}`,
        },
    });
},
}
