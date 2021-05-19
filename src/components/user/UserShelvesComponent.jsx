import { useContext, useEffect, useState } from "react";
import {useHistory, useRouteMatch} from "react-router-dom";
import { authContext } from "../../contexts/authContext";
import RateComponent from "../reusableComponents/RateComponent";
import ShelfComponent from "../reusableComponents/ShelfComponent";
import { UserBookServices } from "../../API/userBookservices";
import { mySessionStorage } from "../../helper/LocalStorge";
import { BASE_URL } from "../../API/urls";
import Rating from "@material-ui/lab/Rating";
import PaginationComponent from '../reusableComponents/PaginationComponent';

export default function UserShelvesComponent() {
  const [userBooks, setUserBooks] = useState([]);
  const [reload, setReload] = useState(false);
  const [filter, setFilter] = useState(0);
  const history = useHistory();
  const [page, setPage] = useState(1);

  useEffect(()=>{
    const getBooks = async () => {
        try{
            const userBooksData = await UserBookServices.userBooks(mySessionStorage.getCurrentUser()._id, page, 7, filter);
            if (userBooksData.status === 200) setUserBooks(userBooksData.data);
            setReload(false);
        }catch(error){
            setUserBooks([]);
        }
    };
    getBooks();
  },[filter, reload])

  return (
    <>
    {
    userBooks.length === 0 ? (
    <div className="text-center m-5">
      <h1>No books yet!</h1>
     <button className="btn btn-success m-5" onClick={() => setFilter(0)}> All My Reads</button>
     <button className="btn btn-primary m-5" onClick={() => history.push("/user/books")}> All Available Books</button>
     </div>)
    :
    <div className="row m-1">
      <h1 className="text-center m-5">My Books interaction</h1>
      <div className="col-2">
      <ul className="list-group" style={{cursor: "pointer"}}>
        <li className={filter === 0 ? "list-group-item active" : "list-group-item"} onClick={() => setFilter(0)}>All</li>
        <li className={filter === 3 ? "list-group-item active" : "list-group-item"} onClick={() => setFilter(3)}>Read</li>
        <li className={filter === 2 ? "list-group-item active" : "list-group-item"} onClick={ () => setFilter(2)}>Currently Reading</li>
        <li className={filter === 1 ? "list-group-item active" : "list-group-item"} onClick={() => setFilter(1)}>Want To Read</li>
      </ul>
      </div>

      <div className="col-10">
      <table className="table table-active table-bordered table-striped">
        <thead className="text-center bg-dark text-light">
            <tr>
                <th>Cover</th>
                <th>Name</th>
                <th>Author</th>
                <th>Avg Rate</th>
                <th>Rating</th>
                <th>Shelve</th>
            </tr>
          
        </thead>
        <tbody>
         { userBooks.data.map( (userBook) => {
            return <tr key={userBook._id}>
              <td className="text-center"> <img width="150px" className="img-fluid" src={BASE_URL+'/'+userBook.book.image} alt="Book" /> </td>
              <td>{userBook.book.name}</td>
              <td>{userBook.book.author.lastname}</td>
              <td><Rating name="read-only" value={userBook.book.avgRating} readOnly size="small"/></td>
              <td><RateComponent bookId={userBook.book._id} userRating={userBook.rating} size="small" ></RateComponent></td>
              <td><ShelfComponent bookId={userBook.book._id} bookShelf={userBook.shelf} setReload={setReload} ></ShelfComponent></td>
            </tr>
          })
        }
        </tbody>
      </table>
      </div>
      <div className="row justify-content-center mt-4 ">
                <div className="col-md-8 ">
                    <PaginationComponent count={userBooks.count} page={page} setPage={setPage}></PaginationComponent>
                </div>
            </div>
    </div>
    }
    </>
  );
}
