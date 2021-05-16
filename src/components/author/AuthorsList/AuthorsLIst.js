import {useEffect, useState} from 'react'
import axios from  'axios'
const AuthorsList = (props)=>{
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
    useEffect( ()=>{
            axios.get('http://localhost:3001/authors?page=0&limit=8')
            .then((response)=>{
                    console.log("response of get request", response.data.allAuthors)
                    const myData = [...response.data.allAuthors]
                    setAuthors(myData)
            })
    }  , [])
    console.log("test test ",authors )
    const mycards = authors.map((one)=>{
            return (
                    <div key={one.firstname} className="card"
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
); 
}

export default AuthorsList 