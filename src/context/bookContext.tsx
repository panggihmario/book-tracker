"use client"; // This is a client component 

import { createContext, useState } from "react";
import { getApi } from "@/lib/axios";
interface BookProps {
    children?: React.ReactNode;
}
interface LooseObject {
    [key: string]: any
}
type BookContextObj = {
    books : LooseObject[],
    fetchNyBooks : () => void
}
export const BookContext = createContext<BookContextObj>({
    books : [],
    fetchNyBooks() {},
})

const BookContextProvider : React.FC<BookProps> = (props) => {
    const [books , setBooks] = useState([])
    function fetchNyBooks () {
        const data = {
            url : 'https://api.nytimes.com/svc/books/v3/lists/names.json',
            params : {
                ['api-key'] : 'nU8tVQpmevHYEQpERx6kFC1Vi2aI44sm'
            }
        }
        return getApi(data)
            .then(response => {
                console.log(response)
                const result = response.data.results
                setBooks(result)
            })
            .catch(err => {
                console.log(err.response)
            })
    }
    const contextValue : BookContextObj = {
        books,
        fetchNyBooks
    }
    return <BookContext.Provider value={contextValue} >{props.children}</BookContext.Provider>
} 

export default BookContextProvider