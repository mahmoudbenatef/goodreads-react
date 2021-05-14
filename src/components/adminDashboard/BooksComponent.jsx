import { useEffect, useState } from "react";
import authorService from "../../API/authorServices";
import bookServiece from "../../API/bookService";
import categoryService from "../../API/categoryServices";
import BookFormComponent from "./BookFormComponent";
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
    setErrors({});
    const response = await bookServiece.addNewBook(newBook);

    if (response.status === 201) setBooks((old) => old.concat(response.data));
    if (response.status === 400) setErrors(response.data);
  };
  return (
    <>
      {loading ? (
        <div>
          <h1>Loading</h1>
        </div>
      ) : (
        <div>
          <ul>
            {books.map((book) => (
              <li>{book.name}</li>
            ))}
          </ul>
          <BookFormComponent
            authors={authors}
            categories={categories}
            onSubmit={addNewBook}
            errors={errors}
          />
        </div>
      )}
    </>
  );
}
