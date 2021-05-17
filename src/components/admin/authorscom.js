import { useEffect, useState } from "react";
import axios from 'axios';
import Pagination from "@material-ui/lab/Pagination";



function Author(props) {

    const [authors , setAuthors] = useState([])
    const [dataIndex , setIndex] = useState(0)

    const [data , setData] = useState([])
    const [totalPages , settotalPages] = useState(0)
    const [currentPage , setcurrentPage] = useState(0)
    const pages = new Array(totalPages).fill(null).map((v , i )=> i )

    const goprev = ()=>{

        setcurrentPage(Math.max(0,currentPage - 1))
    
      }
      const goNext= ()=>{
    
        setcurrentPage(Math.min(totalPages - 1 ,currentPage + 1))
    
      }
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
            }) 
        })
    }
  return (
    <div className="container">
     <div className="container">
                    <div className="d-flex flex-row-reverse">
                          <button className="btn btn-primary add-btn" 
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
                <td>fname</td>
                <td>lname</td>
                <td>date of birth</td>
                <td>actions</td>
                 </tr>
             </thead>
             <tbody>
             {


              authors ?    authors.map((item,index)=>{
        
                
                     return(

                        <tr key={item._id}>
                            <td>{index + 1}</td>
                            <td>
                                
                            <img src={`http://localhost:3001/${item.avatar}`} width="100"/>
                            


                                     </td>
                            <td>{item.firstname}</td>
                            <td>{item.lastname}</td>
                            <td>{
                                
                                item.DOB}</td>


                            <td>
                                <button 
                                onClick={()=>{ 
                                    console.log("item",item)
                                props.clicked2(item )
                                    props.clicked('add' ,"update"  )

                                   }}
                                className="btn btn-warning m-2"
                                >edit</button>
                                <button className="btn btn-danger m-2" 
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
      
     <div className="btn-group" role="group" aria-label="Basic example">
        
        <button type="button"  onClick={goprev} className="btn btn-secondary">prev</button>

        {pages.map((item)=>{
            return(
              

              <button 
              key={item} type="button"  className={`btn  ${currentPage === item ? "btn-primary":"btn-secondary" }`}
              onClick={()=>{
                setcurrentPage(item)   

              }}

            
              >
                
                {item + 1}
              
              </button>

            ) ; 

          })}
            <button type="button" onClick={goNext} className="btn btn-secondary">next</button>

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
