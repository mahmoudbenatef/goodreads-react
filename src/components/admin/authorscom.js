import { useEffect, useState } from "react";
import axios from 'axios';


function Author(props) {

    const [authors , setAuthors] = useState([])
    const [dataIndex , setIndex] = useState(0)


    useEffect(()=>{
        console.log("responsea 1 ")
        axios.get('http://localhost:3001/authors' )
        .then((response)=>{
           
             setAuthors(response.data) 
            console.log("response",response.data)
            }) 
    } , [])
   const  deleteAuthor = (index)=>{
    axios.delete('http://localhost:3001/authors/' + authors[index]._id)
    .then((response)=>{
        console.log("deleted",response.data)
        axios.get('http://localhost:3001/authors' )
        .then((response)=>{
            
             setAuthors(response.data) 
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


    </div>
  );
}

export default Author;
