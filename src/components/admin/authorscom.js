import { useEffect, useState } from "react";
import axios from 'axios';
import Pagination from "@material-ui/lab/Pagination";
import LoadingComponent from "../reusableComponents/LoadingComponent";




function Author(props) {

    const [authors , setAuthors] = useState([])
    const [dataIndex , setIndex] = useState(0)
    const [loading, setLoading] = useState(true);
    const [data , setData] = useState([])
    const [totalPages , settotalPages] = useState(0)
    const [currentPage , setcurrentPage] = useState(0)
    const pages = new Array(totalPages).fill(null).map((v , i )=> i )

    
      const handlePagination= (event , pageNumber)=>{
    
        setcurrentPage(pageNumber - 1)
    
      }


    useEffect(()=>{
        console.log("responsea 1 ")
        axios.get(`http://localhost:3001/authors?page=${currentPage}&limit=${3}` )
        .then((response)=>{
           
             setAuthors(response.data.allAuthors) 
            console.log("response",response.data)
            settotalPages(response.data.totalPages)
            setLoading(false)

            }) 
    } , [currentPage])
   const  deleteAuthor = (index)=>{

    axios.delete('http://localhost:3001/authors/' + authors[index]._id)
    .then((response)=>{
        console.log("deleted",response.data)
        axios.get(`http://localhost:3001/authors?page=${currentPage}` )
        .then((response)=>{
            
             setAuthors(response.data.allAuthors) 
            console.log("response",response.data)
            setLoading(false)

            }) 
        })
    }
  return (
    loading ? <LoadingComponent></LoadingComponent>  :
    
    <div className="container">
     <div className="container">
                    <div className="d-flex flex-row-reverse">
                          <button className="btn btn-primary btn-sm rounded-0 add-btn" 
                           onClick={()=>{ 
                            props.clicked('add',"add")
                           }} >add author 
                           </button> 
                    </div>
         <table className="table table-striped">
             <thead>
                 <tr>
                 <td>#</td>
                <td>image</td>
                <td>first name</td>
                <td>last name</td>
                <td>date of birth</td>
                <td>actions</td>
                 </tr>
             </thead>
             <tbody>
             {


              authors ?    authors.map((item,index)=>{
        
                
                     return(

                        <tr key={item._id}>
                            <td className="pt-5">{index + 1}</td>
                            <td>
                                
                            <img src={`http://localhost:3001/${item.avatar}`} width="100"/>
                          
                                     </td>
                            <td  className="pt-5">{item.firstname}</td>
                            <td  className="pt-5">{item.lastname}</td>
                            <td  className="pt-5">{
                                
                                item.DOB}</td>


                            <td>
                                <button 
                                onClick={()=>{ 
                                    console.log("item",item)
                                props.clicked2(item )
                                    props.clicked('add' ,"update"  )

                                   }}
                                // className="btn btn-warning m-2"
                                className="btn btn-success btn-sm rounded-0 m-2 mt-5"
                                
                                >edit</button>
                                <button className="btn btn-danger btn-sm rounded-0 m-2 mt-5" 
                                onClick={()=>{
                                        deleteAuthor(index)

                                }}  
                                >delete</button>
                            </td>
                        </tr>
                     ) ; 
                 })
            : "" }
             </tbody>
         </table>
     </div>
    <div className="row" >
                <div className=" container  " 
                        style={{
                                display: "flex", 
                                justifyContent: "center", 
                              }} >
                        <Pagination
                      count={totalPages}
                      variant="outlined"
                      color="primary" 
                      onChange={handlePagination}
                 />
             </div>
    </div>


    </div>  
  );
}

export default Author;
