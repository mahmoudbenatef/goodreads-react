import {useState, useEffect, useContext} from "react"
import {ApiServices} from "../../../API/ApiServices";
import {categoryContext} from "../../../contexts/categoryContext";
import ErrorComponent from "../../reusableComponents/ErrorComponent";

export default function ({category, setCatgory}) {
    const catContext = useContext(categoryContext)
    const [errorMsg, setErrorMsg] = useState('')
    const [editedcategory, setEditedCatgory] = useState(0)

    useEffect(() => {
        setErrorMsg("")
    }, [
        category.value.label
    ])



    
    useEffect(() => {
        let temp = {...category}
        temp.value.label = ''
        temp.status='add'
        setCatgory(temp)

    }, [catContext.newOneAdded])




    useEffect(() => {
        if (editedcategory) {
            console.log("child add new cat")
            if (category.status === 'add') {
                ApiServices.addCategory({label: category.value.label})
                    .then(function (response) {
                        catContext.setNewOneAdded(catContext.newOneAdded + 1)
                    })
                    .catch(err => {
                            if ('driver' in err.response.data) {
                                setErrorMsg("category label must be unique ")
                            } else {
                                setErrorMsg(err.response.data.errors.label.message)
                            }
                        }
                    )

            } else if (category.status === 'edit') {
                console.log(category.value.label, "aaaaaaaaaaaa")
                ApiServices.editCategory(category.value._id, category.value.label)
                    .then(function (response) {
                        catContext.setNewOneAdded(catContext.newOneAdded + 1)
                    })
                    .catch(err => {
                            if ('driver' in err.response.data) {
                                setErrorMsg("category label must be unique ")
                            } else {
                                setErrorMsg(err.response.data.errors.label.message)
                            }
                        }
                    )
            }
        }
    }, [editedcategory])
    return (
        <>
            <div className="row justify-content-center mt-4 ">
                <div className="col-md-6 ">
                    <input type="text" value={category.value.label}
                           onChange={(e) => {
                               let temp = {...category}
                               temp.value.label = e.target.value
                               setCatgory(temp)
                           }}
                           className="form-control" placeholder={"category name"}
                           aria-describedby="emailHelp"/>
                </div>
                <div className="col-md-2">
                    <button className={"btn btn-primary"} onClick={() => {
                        setEditedCatgory(editedcategory + 1)
                    }}> {category.status === 'edit' && <span>Edit </span>} {category.status === 'add' &&
                    <span>Add </span>}
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-6">
                    {errorMsg !== "" &&
                    <ErrorComponent> {errorMsg}</ErrorComponent>
                    }
                </div>
            </div>

        </>
    )
}
