import {createContext, useState} from "react"

export const categoryContext = createContext()
const {Provider} = categoryContext

export function CategoryProvider({children}) {

    const [newOneAdded, setNewOneAdded] = useState(0)
    return <>
        <Provider value={{newOneAdded, setNewOneAdded}}>{
            children}</Provider>
    </>
}
