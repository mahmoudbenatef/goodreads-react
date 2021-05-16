import { useRef, useState } from "react"
import react  from 'react'

const UploadImage = (props)=>{
const refTofileUploader = useRef() ; 

const [pickedFile , setPickedFile] = useState()
const [isVlaidImg , setisVlaidImg] = useState(false)

const openUpload = ()=>{
    refTofileUploader.current.click()

}

const pickedHandler =(event)=>{
    let pickedONe ; 
    let fileIsValid ; 
    console.log(" 18  pickedFile in props",pickedONe)

    if (event.target.files && event.target.files.length === 1 )
    {
         pickedONe =  event.target.files[0]

        setPickedFile(pickedONe)

        setisVlaidImg(true)
        fileIsValid = true
        console.log(" 28  pickedFile in props",pickedONe)


    }else{

        console.log(" 31  pickedFile in props",pickedONe)

        setisVlaidImg(false)
        fileIsValid = false
    }
    console.log(" 35 pickedFile in props",pickedONe)

        props.uploadInput(pickedONe,fileIsValid)

}
return(

<div className="container">
    <input
            ref={refTofileUploader}
        type="file"
        accept=".jpg,.png,.jpeg"
         style={{display:"none"}}

         onChange={pickedHandler}
    />
<button type="button" className="btn btn-info" onClick={openUpload}>pick your avatar</button>

</div>


); 




}

export default UploadImage 