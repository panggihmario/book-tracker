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
    nyBooks : LooseObject[],
    fetchNyBooks : () => void,
    fetchBooks : () => void,
}
export const BookContext = createContext<BookContextObj>({
    books : [],
    nyBooks : [],
    fetchNyBooks() {},
    fetchBooks : () => {},
})

const BookContextProvider : React.FC<BookProps> = (props) => {
    const [books , setBooks] = useState([])
    const [nyBooks, setNyBooks] = useState([])
    const booksUrl = 'https://frontend-assignment-be.vercel.app/api/books'
    const fetchBooks = function () {
        const data = {
            url : booksUrl
        }
        return getApi(data)
            .then(response => {
                console.log(response)
                const responseData = response.data
                const results = responseData.books
                setBooks(results)
                return results
            })
            .catch(err => {
                console.log(err)
            })
    }

    const fetchNyBooks = function () {
        const data = {
            url : 'https://api.nytimes.com/svc/books/v3/lists/names.json',
            params : {
                ['api-key'] : 'nU8tVQpmevHYEQpERx6kFC1Vi2aI44sm'
            }
        }
        return getApi(data)
            .then(response => {
                const result = response.data.results
                setBooks(result)
            })
            .catch(err => {
                console.log(err.response)
            })
    }
    const contextValue : BookContextObj = {
        books,
        nyBooks,
        fetchNyBooks,
        fetchBooks,
    }
    return <BookContext.Provider value={contextValue} >{props.children}</BookContext.Provider>
} 

export default BookContextProvider