import {useEffect, useState} from 'react'
import PaginationComponent from '../../reusableComponents/PaginationComponent'
import Pagination from "@material-ui/lab/Pagination";
import "../../../styles/authors.css";
import { Link } from "react-router-dom";
import LoadingComponent from "../../reusableComponents/LoadingComponent";
import { BASE_URL } from "../../../API/urls";




import axios from  'axios'
const AuthorsList = (props)=>{
    const [page, setPage] = useState(0);
    const [count, setCount] = useState(0);


    const [authors , setAuthors] = useState([
      
    ]) 
     const [loading, setLoading] = useState(true);


    const handlePagination = (event, pageNumber) => {
        console.log("number",pageNumber )
        setPage(pageNumber - 1);
      };
    useEffect( ()=>{
            axios.get(`http://localhost:3001/authors?page=${page}&limit=${3}`)
            .then((response)=>{
                    console.log("response of get request", response.data)
                    const myData = [...response.data.allAuthors]
                    const mycount = response.data.totalPages
                    setAuthors(myData)
                    setCount(mycount)
                    setLoading(false)
            })
    }  , [page])
    console.log("test test ",authors )
    // const mycards = authors.map((one)=>{
    //         return (
    //                 <div key={one._id} className="card"
    //                  style={
    //                      {width: "18rem"   }
    //                 }>
    //                 <img className="card-img-top"
    //                  src={`http://localhost:3001/${one.avatar}`}
    //                   alt="Card image cap"/>
    //                 <div className="card-body">
    //                     <a href="#" className="link-info">
    //                         {one.firstname + "  "  + one.lastname }
    //                      </a>
    //                 </div>
    //                 </div>
    //         ); 
    // })
    const mycards = loading? <LoadingComponent></LoadingComponent> :
      authors.map((value, index) => {
        return (
        <div className="book read" key={index}>
          <div className="cover">
          <Link to={"/author/"+value._id}>
          <img src={BASE_URL+"/"+value.avatar} />
          </Link>
          </div>
          <div className="description">
            <p className="title">{value.firstname} {value.lastname}</p>
          </div>
        </div>
        )})
      
return(
<div  className="container">
<div className="container" 

style={
    { 
     display: "flex"  ,
     justifyContent: "center"  , 
     flexWrap: "wrap"  , 
        border: "1px solid black" 
    }
}
>
    {mycards}

    
</div>

<div className="row " 
 >
                <div className=" container  " style={{
      display: "flex", 

    justifyContent: "center", 
    }} >
                <Pagination
              count={count}
              variant="outlined"
              color="primary"
              onChange={handlePagination}
            />
        </div>
</div>
</div>
); 
}

export default AuthorsList 