import Pagination from "@material-ui/lab/Pagination";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { BASE_URL } from "../../../API/urls";
import "../../../styles/authors.css";
import LoadingComponent from "../../reusableComponents/LoadingComponent";




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

    const mycards = loading? <LoadingComponent></LoadingComponent> :
      authors.map((value, index) => {
        return (
        <div className="book read" key={index}>
          <div className="cover">
          <Link to={"/authors/"+value._id}>
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