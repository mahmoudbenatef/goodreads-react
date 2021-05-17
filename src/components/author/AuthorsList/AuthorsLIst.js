import {useEffect, useState} from 'react'
import PaginationComponent from '../../reusableComponents/PaginationComponent'
import Pagination from "@material-ui/lab/Pagination";

import axios from  'axios'
const AuthorsList = (props)=>{
    const [page, setPage] = useState(0);
    const [count, setCount] = useState(0);


    const [authors , setAuthors] = useState([
            // {name : "mohamed kaoud ", image : "https://picsum.photos/200/300.jpg"},
            // {name : "mahmoud  atef ", image : "https://picsum.photos/200/300.jpg"},
            // {name : "ahmed mamdouh ", image : "https://picsum.photos/200/300.jpg"},
            // {name : "aya  hammed ", image : "https://picsum.photos/200/300.jpg"},
            // {name : "abo baker ", image : "https://picsum.photos/200/300.jpg"},
            // {name : "hossam  mohamed ", image : "https://picsum.photos/200/300.jpg"},
            // {name : "abdelrahman montaser ", image : "https://picsum.photos/200/300.jpg"},
            // {name : "hatem mohamed ", image : "https://picsum.photos/200/300.jpg"},
            // {name : "sherlok holmes ", image : "https://picsum.photos/200/300.jpg"},
            // {name : "ahmed ramadan ", image : "https://picsum.photos/200/300.jpg"}
    ])

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
            })
    }  , [page])
    console.log("test test ",authors )
    const mycards = authors.map((one)=>{
            return (
                    <div key={one._id} className="card"
                     style={
                         {width: "18rem"   }
                    }>
                    <img className="card-img-top"
                     src={`http://localhost:3001/${one.avatar}`}
                      alt="Card image cap"/>
                    <div className="card-body">
                        <a href="#" className="link-info">
                            {one.firstname + "  "  + one.lastname }
                         </a>
                    </div>
                    </div>
            ); 
    })
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