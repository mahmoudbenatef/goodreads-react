import {useContext, useEffect, useState} from "react"
import {categoryContext} from "../../../contexts/categoryContext";
import {ApiServices} from "../../../API/ApiServices";

export default function ({changeState}) {
    const [categories, setCategories] = useState([])
    const catContext = useContext(categoryContext)
    const [deletedElement, setDeletedElement] = useState(null)
    useEffect(() => {
        if (deletedElement) {
            ApiServices.deleteCategory(deletedElement).then(() => {
                catContext.setNewOneAdded(deletedElement)
            }).catch()
        }
    }, [deletedElement])

    useEffect(() => {
        ApiServices.listCategories().then((data) => {
            setCategories(data.data.data)
            console.log(data.data.data)
        }).catch()
    }, [catContext.newOneAdded])
    return (

        <div className="row justify-content-center mt-4 ">
            <div className="col-md-8 ">

                <table className="table">
                    <caption>List of categories</caption>
                    <thead key={-1}>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Category</th>
                        <th colSpan={2} scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {categories.length > 0 && categories.map((cat, index) => {
                        return <>

                            <tr key={cat._id.toString()}>
                                <td>{index + 1}</td>
                                <td>{cat.label}</td>
                                <td>
                                    <button className={"btn btn-warning"} onClick={() => {
                                        changeState({status: 'edit', value: {...cat}})
                                    }
                                    }>Edit
                                    </button>
                                </td>
                                <td>
                                    <button className={"btn btn-danger"} onClick={() => {
                                        setDeletedElement(cat._id)
                                    }
                                    }>delete
                                    </button>
                                </td>
                            </tr>
                        </>
                    })}
                    {categories.length === 0 &&
                    <tr>
                        <td colSpan={4}> nodata yet</td>
                    </tr>}
                    </tbody>
                </table>
            </div>
        </div>

    )
}
