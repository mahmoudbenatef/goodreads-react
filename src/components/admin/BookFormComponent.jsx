import { Modal } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ErrorComponent from "../reusableComponents/ErrorComponent";

const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};
export default function BookFormComponent({
  updatedbook,
  authors,
  categories,
  buttonTitle,
  buttonClassName,
  onSubmit,
}) {
  const [book, setBook] = useState({
    name: "",
    description: "",
    author: { name: "" },
    category: { label: "" },
    image: "",
  });

  // handleGivenBookToUpdate
  useEffect(() => {
    if (updatedbook) setBook({ ...updatedbook });
  }, []);

  const [errors, setErrors] = useState({});

  // open modal
  const [open, setOpen] = useState(false);

  // handle open modal
  const handleOpen = () => {
    setOpen(true);
  };

  // handle close modal
  const handleClose = () => {
    setOpen(false);
  };

  const resetForm = () => {
    setErrors({});
    setBook({
      name: "",
      description: "",
      author: { name: "" },
      category: { label: "" },
    });
  };

  // if not passed assign as default
  buttonTitle = buttonTitle ?? "Create";
  buttonClassName = buttonClassName ?? "btn btn-success";

  const isValidForm = (cb) => {
    let errors = {};

    if (book.name === "") errors["name"] = "Book Name is required!";
    if (book.description === "")
      errors["description"] = "Book Description is required!";

    if (book.author.name === "" || book.author === "")
      errors["author"] = "Book Author is required!";
    if (book.category.label === "")
      errors["category"] = "Book Category is required!";
    if (book.image === "") errors["image"] = "Book Image is required!";

    if (isEmptyObject(errors)) errors = null;
    console.log(errors);

    return cb(errors);
  };

  const handleClick = () => {
    isValidForm((err) => {
      // rais Error if exsit
      if (err) return setErrors(err);

      // use form data object to carry the file input
      const form = new FormData();
      Object.entries(book).map(([key, value]) => form.append(key, value));

      // submit form
      onSubmit(form);

      // reset form
      setOpen(false);
      resetForm();
    });
  };

  return (
    <>
      <button type="button" className={buttonClassName} onClick={handleOpen}>
        {buttonTitle}
      </button>
      <Modal
        open={open}
        style={{ height: "95vh" }}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        className="container justify-content-center bg-secondary  bg-gradient border border-1 border-danger w-50 text-white mt-3 p-2"
      >
        <form
          className="container mt-5 justify-content-center p-1"
          onSubmit={(e) => {
            e.preventDefault();
            handleClick();
          }}
        >
          <h1 className="text-center " id="modal-title">
            {" "}
            {buttonTitle} Book{" "}
          </h1>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="form-control"
              placeholder="book name"
              value={book.name}
              required
              onChange={(e) =>
                setBook((oldBook) => ({ ...oldBook, name: e.target.value }))
              }
            />
          </div>
          {errors && errors.name && (
            <ErrorComponent>{errors.name}</ErrorComponent>
          )}
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              type="text"
              className="form-control"
              value={book.description}
              onChange={(e) =>
                setBook((oldBook) => ({
                  ...oldBook,
                  description: e.target.value,
                }))
              }
              required
            />
          </div>
          {errors && errors.description && (
            <ErrorComponent>{errors.description}</ErrorComponent>
          )}
          <div className="mb-3">
            <label htmlFor="author" className="form-label">
              Authors
            </label>
            <select
              name="authors"
              id="authors"
              className="form-select"
              required
              onChange={(e) =>
                setBook((oldBook) => ({ ...oldBook, author: e.target.value }))
              }
            >
              <option></option>
              {authors.map((auth) => (
                <option
                  selected={book.author.firstname === auth.firstname}
                  value={auth._id}
                  key={auth._id}
                >
                  {auth.firstname} {book.author.firstname === auth.firstname}
                </option>
              ))}
            </select>
          </div>
          {errors && errors.author && (
            <ErrorComponent>{errors.author}</ErrorComponent>
          )}

          <label htmlFor="ctegory" className="form-label">
            Categories
          </label>
          <select
            name="categories"
            id="categories"
            className="form-select"
            required
            onChange={(e) =>
              setBook((oldBook) => ({ ...oldBook, category: e.target.value }))
            }
          >
            <option></option>

            {categories.map((cat) => (
              <option
                selected={book.category.label === cat.label}
                value={cat._id}
                key={cat._id}
              >
                {cat.label}
              </option>
            ))}
          </select>
          {errors && errors.category && (
            <ErrorComponent>{errors.category}</ErrorComponent>
          )}
          <div className="mb-3">
            <label htmlFor="forminput" class="form-label mt-3">
              Select book image
            </label>

            <input
              className="form-control form-control-sm"
              type="file"
              accept="image/*"
              required
              onChange={(e) =>
                setBook((old) => ({ ...old, image: e.target.files[0] }))
              }
            />
          </div>
          {errors && errors.image && (
            <ErrorComponent>{errors.image}</ErrorComponent>
          )}
          <input
            type="submit"
            className={buttonClassName}
            value={buttonTitle}
          />
        </form>
      </Modal>
    </>
  );
}
