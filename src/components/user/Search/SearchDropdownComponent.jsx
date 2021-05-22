import React, { useState } from "react";
import { Link } from "react-router-dom";
import BookService from "../../../API/bookServices";
import { BASE_URL } from "../../../API/urls";
import "./style.css";

export default function SearchComponent() {
  const [books, setBooks] = useState([]);
  const [searchValue,setSearchValue] = useState("");
  const search = (event) => {
    setSearchValue(event.target.value);
    if (event.target.value == "") setBooks([]);
    else
      BookService.search(event.target.value,0).then((result) => {
        setBooks(result.data);
      });
  };
  const reset = ()=>{
    setSearchValue("");
    setBooks([]);
  }
  return (
    <>
      <div className="search-area">
        <form
          className="form-inline my-2 my-lg-0"
          style={{
            marginRight: "1rem",
            marginLeft: "1rem",
            borderRadius: "3rem",
          }}
        >
          <input
            className="form-control mr-5"
            type="text"
            placeholder="Search"
            aria-label="Search"
            value={searchValue}
            style={{ borderRadius: "2rem", width: "20rem" }}
            onChange={search}
            list="data"
          />
          <div
            id="searchDropDown"
            className="search-dropdown rounded  border border-1 p-2"
            tabIndex="0"
            style={{ display: books.length ? "block" : "none" }}
            onClick={reset}
          >
            {books.map((value, index) => (
              <Link
                key={value._id}
                className="search-dropdown-content dropdown-item"
                to={"/book/" + value._id}
              >
                  <div class="image">
                    <img src={BASE_URL + "/" + value.image} />
                  </div>
                  <div class="name">
                    <p>{value.name.slice(0, 15)}</p>
                  </div>
                  <div class="author">
                    <p>by {value.author.firstname} {value.author.lastname}</p>
                  </div>
              </Link>
            ))}
            <a
              className="dropdown-item view-all"
              href="#"
            >
              View All
            </a>
          </div>
        </form>
      </div>
    </>
  );
}
