import BookCardComponent from "./BookCardComponent";
import {useEffect, useState} from "react";
import BookService from "../../API/bookService"
import data from "bootstrap/js/src/dom/data";
import bookServiece from "../../API/bookService";
import authorService from "../../API/authorServices";
import categoryService from "../../API/categoryServices";
const Books = [1,2,3,4,5,6]
export default function BooksCardContainerComponent  (){
    const [books, setBooks]= useState([])
    useEffect(()=>{
        const getAllData = async () => {
            // getting books
            const booksResponse = await bookServiece.getAllBooks();
            if (booksResponse.status === 200) setBooks(booksResponse.data);



        };

    },[])
    return (
        <>
            <h1>Books</h1>
        <div className="container">
            <div className="row">
                {
                    Books.map((book)=>{
                        return <div className={"col-md-4 pt-5"}><BookCardComponent></BookCardComponent></div>
                    })
                }
            </div>
        </div>
        </>
    )
}
