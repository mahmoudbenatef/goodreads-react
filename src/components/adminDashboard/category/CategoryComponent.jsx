import { useState } from "react";
import EditCategoryConponent from "./EditAndCreateCategoryConponent";
import ListCategoriesComponent from "./ListCategoriesComponent";

export default function () {
    const [editOrCreate, setEditOrCreate] = useState({status: 'create'})
    const [category, setCatgory] = useState({status: 'add', value: {label: ''}})
    return (
        <>
        <h1 style={{textAlign:"center",marginTop:"3rem"}}> Categories </h1>
        <div className={"d-flex flex-column min-vh-100 align-items-center  "}>
            <div className="row justify-content-center w-100 p-3 rounded-3">
                <div className="row justify-content-center mt-5 flex-xl-shrink-2">
                    <EditCategoryConponent category={category} setCatgory={setCatgory}/>
                    <ListCategoriesComponent  changeState={setCatgory}/>

                </div>
            </div>

        </div>
        </>
    )
}
