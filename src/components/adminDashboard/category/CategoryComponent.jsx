import ListCategoriesComponent from "./ListCategoriesComponent";
import {categoryContext} from "../../../contexts/categoryContext";
import {useContext, useEffect, useState} from "react";
import EditCategoryConponent from "./EditAndCreateCategoryConponent";

export default function () {
    const [editOrCreate, setEditOrCreate] = useState({status: 'create'})
    const [category, setCatgory] = useState({status: 'add', value: {label: ''}})
    return (

        <div className={"d-flex flex-column min-vh-100 align-items-center  "}>
            <div className="row justify-content-center w-100 p-3 rounded-3">
                <div className="row justify-content-center mt-5 flex-xl-shrink-2">
                    <div className="col-md-12 flex-xl-shrink-2">
                        <h1> Categories </h1>
                    </div>
                    <EditCategoryConponent category={category} setCatgory={setCatgory}/>
                    <ListCategoriesComponent  changeState={setCatgory}/>

                </div>
            </div>

        </div>
    )
}
