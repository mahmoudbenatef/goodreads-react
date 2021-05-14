import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useEffect, useState } from "react";
import authorService from "../../API/authorServices";
import bookServiece from "../../API/bookService";
import categoryService from "../../API/categoryServices";
import BookFormComponent from "../admin/BookFormComponent";
export default function AdminBooksComponent() {
  // TODO: 1) create BookFormComponent,
  // TODO: 2) table to list all books,
  // TODO: 3) edit, and delete books,

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authors, setAuthors] = useState([
    { name: "ahmed", _id: 1 },
    { name: "mohamed", _id: 2 },
  ]);

  const [categories, setCategories] = useState([
    { lable: "food", _id: 1 },
    { lable: "education", _id: 2 },
  ]);
  const [errors, setErrors] = useState({});
  //   getting books, categories, authors
  useEffect(() => {
    const getAllData = async () => {
      // getting books
      const booksResponse = await bookServiece.getAllBooks();
      if (booksResponse.status === 200) setBooks(booksResponse.data);

      // getting authors
      const authorsResponse = await authorService.getAllAuthors();
      if (authorsResponse.status === 200) setAuthors(authorsResponse.data);

      //getting categories
      const categoriesResponse = await categoryService.getAllCategories();
      if (categoriesResponse.status === 200)
        setCategories(categoriesResponse.data);

      setLoading(false);
    };
    getAllData();
  }, []);

  // add new book
  const addNewBook = async (newBook) => {
    console.log(newBook);
    const response = await bookServiece.addNewBook(newBook);

    if (response.status === 201) setBooks((old) => old.concat(response.data));
    if (response.status === 400) setErrors(response.data);
  };

  const editBook = (updatedBook) => {
    console.log(updatedBook, "\n updated book");
  };

  const handleDeleteBook = (deletedBook) => {
    const updatedBooks = books.filter((book) => book._id != deletedBook._id);
    setBooks([...updatedBooks]);
  };
  return (
    <>
      {loading ? (
        <div>
          <h1>Loading</h1>
        </div>
      ) : (
        <div className="container justify-content-center mt-3">
          <div className="mt-5  mb-3 float-end ">
            <BookFormComponent
              authors={authors}
              categories={categories}
              onSubmit={addNewBook}
              buttonTitle="Add New "
            />
          </div>
          <table class="table">
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
        </div>
      )}
    </>
  );
}
