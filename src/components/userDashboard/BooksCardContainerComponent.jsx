import BookCardComponent from "./BookCardComponent";
import {useEffect, useState} from "react";
import bookServiece from "../../API/bookService";
import {BASE_URL} from "../../API/urls"
import PaginationComponent from "../reusableComponents/PaginationComponent"

export default function BooksCardContainerComponent  (){
    const [books, setBooks]= useState([])
    const [page, setPage] = useState(1);
    console.log(books)
    useEffect(()=>{
        const getAllData = async () => {
            const booksResponse = await bookServiece.getAllBooks(`?page=${page}&limit=${6}`);
            console.log(booksResponse)
            if (booksResponse.status === 200) setBooks(booksResponse.data);
        };
    getAllData()
    },[page])
    return (
        <>
            <h1>Books</h1>
        <div className="container">
            <div className="row">

                { !books.data ?
                        <h1>No data yet</h1>
                :
                    books.data.map((book)=>{
                        return <div className={"col-md-4 pt-5"}><BookCardComponent bookID={book._id} rate={book.avgRating} image={BASE_URL+'/'+book.image} bookName={book.name} authorName={book.author.firstname+ " "+ book.author.lastname}></BookCardComponent></div>
                    })
                }
            </div>
        </div>

            <div className="row justify-content-center mt-4 ">
                <div className="col-md-8 ">
                    <PaginationComponent count={books.count} page={page} setPage={setPage}></PaginationComponent>
                </div>
            </div>
        </>
    )
}
