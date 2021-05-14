import React, { useEffect, useState } from "react";

export default function BookFormComponent({
  updatedbook,
  authors,
  categories,
  buttonTitle,
  buttonClassName,
  onSubmit,
  errors,
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

  // if not passed assign as default
  buttonTitle = buttonTitle ?? "Create";
  buttonClassName = buttonClassName ?? "btn btn-info";

  const handleClick = () => {
    const form = new FormData();

    Object.entries(book).map(([key, value]) => form.append(key, value));
    console.log(form.get("image"));

    onSubmit(form);
    // reset form
    setBook({
      name: "",
      description: "",
      author: { name: "" },
      category: { label: "" },
    });
  };

  return (
    <>
      <form
        className="container"
        onSubmit={(e) => {
          e.preventDefault();
          handleClick();
        }}
      >
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={book.name}
          required
          onChange={(e) =>
            setBook((oldBook) => ({ ...oldBook, name: e.target.value }))
          }
        />
        <label htmlFor="description">Description</label>
        <input
          id="description"
          type="text"
          className="form-container"
          value={book.description}
          onChange={(e) =>
            setBook((oldBook) => ({ ...oldBook, description: e.target.value }))
          }
          required
        />

        <label htmlFor="author">Authors</label>
        <select
          name="authors"
          id="authors"
          required
          onChange={(e) =>
            setBook((oldBook) => ({ ...oldBook, author: e.target.value }))
          }
        >
          <option></option>
          {authors.map((auth) => (
            <option
              selected={book.author.name === auth.name}
              value={auth._id}
              key={auth._id}
            >
              {auth.firstname}
            </option>
          ))}
        </select>
        <label htmlFor="ctegory">Categories</label>
        <select
          name="categories"
          id="categories"
          required
          value={book.category.label}
          onChange={(e) =>
            setBook((oldBook) => ({ ...oldBook, category: e.target.value }))
          }
        >
          <option></option>

          {categories.map((cat) => (
            <option
              selected={book.category && book.category.label === cat.label}
              value={cat._id}
              key={cat._id}
            >
              {cat.label}
            </option>
          ))}
        </select>
        <input
          type="file"
          accept="image/*"
          required
          onChange={(e) =>
            setBook((old) => ({ ...old, image: e.target.files[0] }))
          }
        />
        <input type="submit" className={buttonClassName} value={buttonTitle} />
      </form>
      {errors && Object.values(errors).map((error) => <h1>{error}</h1>)}
    </>
  );
}
