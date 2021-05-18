import {useContext, useEffect, useState} from "react"
import {categoryContext} from "../../../contexts/categoryContext";
import {ApiServices} from "../../../API/ApiServices";
import PaginationComponent from "../../reusableComponents/PaginationComponent"
import LoadingCompoenet from "../../reusableComponents/LoadingComponent";

export default function ({changeState}) {
    const [categories, setCategories] = useState([])
    const catContext = useContext(categoryContext)
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    console.log(page)
    const [deletedElement, setDeletedElement] = useState(null)
    useEffect(() => {
        if (deletedElement) {
            ApiServices.deleteCategory(deletedElement).then(() => {
                catContext.setNewOneAdded(deletedElement)
            }).catch()
        }
    }, [deletedElement])

    useEffect(() => {
        ApiServices.listCategories(`?page=${page}&limit=${6}`).then((data) => {
            setCategories(data.data)
            setLoading(false)
            console.log(data.data)
        }).catch()
    }, [catContext.newOneAdded,page])
    return (
        <>
            { loading?
                <LoadingCompoenet/>
                :
          <div>
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
                        {categories.data && categories.data.length > 0 && categories.data.map((cat, index) => {
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
                        {categories.data && categories.data.length === 0 &&
                        <tr>
                            <td colSpan={4}> nodata yet</td>
                        </tr>}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row justify-content-center mt-4 ">
                <div className="col-md-8 ">
                    <PaginationComponent count={categories.count} page={page} setPage={setPage}></PaginationComponent>
                </div>
            </div>
          </div>

            }
        </>

    )
}
