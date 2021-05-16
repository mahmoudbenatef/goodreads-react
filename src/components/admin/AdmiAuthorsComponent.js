import Author from './authorscom'
import ADD from './addAuthor/addAuthor'
import {  useState } from "react";

// import { BrowserRouter as Router,Route } from "react-router-dom";
function AdminAuthors() {
  const [displayed , setDisplayed] = useState("author")
  const [label , setLabel] = useState("update")
  const [updatedObject , setUpdatedObject] = useState({} )



  const triggered= (status ,typeOfForm)=>{
    setLabel(typeOfForm)
    setDisplayed(status)
  }
  const triggeredFromAdd= (status)=>{
    setDisplayed(status)
  }
  const passData =(item )=>{

    setUpdatedObject(item)
  }
  return (
    // <Router>
    <div className="App">
    

         { displayed === "author" ?  <Author  
         clicked2={(status  )=>{ passData(status)}}
          clicked= { (status ,typeOfForm )=>{ triggered(status,typeOfForm)}}  />  : ''}
                  { displayed === "add" ?  < ADD   
                  myObject= { updatedObject } 
                  clicked= { (status  )=>{ triggeredFromAdd(status)}} 
                  label={label}
                  /> : ''}

 {/* <Route path="/create" render={() => <h1>Welcome!</h1>} /> */}
          </div>
    //  </Router>

  );
}
export default AdminAuthors;
