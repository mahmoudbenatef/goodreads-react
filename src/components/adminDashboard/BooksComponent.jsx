import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Pagination from "@material-ui/lab/Pagination";
import { useEffect, useState } from "react";
import authorService from "../../API/authorServices";
import bookServiece from "../../API/bookServices";
import categoryService from "../../API/categoryServices";
import statusCode from "../../helper/statusCode";
import BookFormComponent from "../admin/BookFormComponent";
import LoadingCompoenet from "../reusableComponents/LoadingComponent";

//set book limit
const limit = 5;

export default function AdminBooksComponent() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);

  // books pagination

  const [paginateBooks, setPaginateBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [pagesCount, setPagesCount] = useState(0);

  // paginate books
  useEffect(async () => {
    const params = {
      page,
      limit,
    };
    const booksResponse = await bookServiece.getAllBooks(params);
    if (booksResponse.status === 200) {
      setBooks(booksResponse.data.data);
      setPagesCount(booksResponse.data.count);
    }
  }, [page]);

  //   getting books, categories, authors
  useEffect(() => {
    const getAllData = async () => {
      // getting books
      const booksResponse = await bookServiece.getAllBooks();
      if (booksResponse.status === 200) setBooks(booksResponse.data.data);

      // getting authors
      const authorsResponse = await authorService.getAllAuthors();

      if (authorsResponse.status === 200)
        setAuthors(authorsResponse.data.allAuthors);

      //getting categories
      const categoriesResponse = await categoryService.getAllCategories();
      if (categoriesResponse.status === 200)
        setCategories(categoriesResponse.data.data);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };
    getAllData();
  }, []);

  // add new book
  const addNewBook = async (newBook) => {
    const response = await bookServiece.addNewBook(newBook);

    if (response.status === statusCode.Created)
      setBooks((old) => old.concat(response.data));
    if (response.status === statusCode.BadRequest)
      alert("Somthing went wronge Please try again Later");
  };

  // editt old book
  const editBook = async (updatedBook) => {

    const updatedBookId = updatedBook.get("_id");
    const kaoud = updatedBook.get("author"); 

    const response = await bookServiece.editBook(updatedBookId, updatedBook);
    // in case there is a server problem
    if (response.status !== statusCode.Success) {
      return alert("Somthing went wronge Please try again Later");
    }

    // getting  book reference to change it in the new array
    const oldBook = books.find((book) => book._id === updatedBookId);
    const index = books.indexOf(oldBook);

    // new reference to update the stat
    const updatedBooks = [...books];
    // replace old book with updated  book
    updatedBooks[index] = response.data;

    setBooks(updatedBooks);
  };
  // deletebook
  const handleDeleteBook = async (deletedBook) => {
    const response = await bookServiece.deleteBook(deletedBook._id);
    // in case there is a server problem
    if (response.status !== statusCode.NoContent) {
      return alert("Somthing went wronge Please try again Later");
    }

    const updatedBooks = books.filter((book) => book._id !== deletedBook._id);
    setBooks([...updatedBooks]);
  };

  // get nex page of pagination books
  const handlePagination = (event, pageNumber) => {
    setPage(pageNumber);
  };
  return (
    <>
      {loading ? (
        <LoadingCompoenet />
      ) : (
        <div className="container justify-content-center mt-3 text-center ">
          <div className="mt-5  mb-3 float-end ">
            <BookFormComponent
              authors={authors}
              categories={categories}
              onSubmit={addNewBook}
              buttonTitle="Add New "
            />
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Book Name</th>
                <th scope="col">Author</th>
                <th scope="col">Category</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{book.name}</td>
                  <td>{book.author.firstname}</td>
                  <td>{book.category.label}</td>
                  <td>
                    <BookFormComponent
                      updatedbook={book}
                      buttonTitle="Edit"
                      buttonIcon={<EditIcon fontSize="small" />}
                      buttonClassName="btn btn-warning btn-sm"
                      authors={authors}
                      categories={categories}
                      onSubmit={editBook}
                    />
                    {"  "}
                    <span className="btn btn-sm btn-danger">
                      <DeleteIcon onClick={() => handleDeleteBook(book)} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-center">
            <Pagination
              count={pagesCount}
              variant="outlined"
              color="secondary"
              onChange={handlePagination}
            />
          </div>
        </div>
      )}
    </>
  );
}
