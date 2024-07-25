"use client"; // This is a client component 

import { createContext, useState } from "react";
import { getApi, putApi, postApi, deleteApi } from "@/lib/axios";
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
    editBook : (payload : any) => void,
    addBook : (payload : any) => void,
    deleteBook : (payload : any) => void
}
export const BookContext = createContext<BookContextObj>({
    books : [],
    nyBooks : [],
    fetchNyBooks() {},
    fetchBooks : () => {},
    editBook : () => {},
    addBook: async () => {},
    deleteBook : () => {}
})

const BookContextProvider : React.FC<BookProps> = (props) => {
    const [books , setBooks] = useState<any>([])
    const [nyBooks, setNyBooks] = useState([])
    const booksUrl = 'https://frontend-assignment-be.vercel.app/api/books'
    const fetchBooks = function () {
        const data = {
            url : booksUrl
        }
        return getApi(data)
            .then(response => {
                const responseData = response.data
                const results = responseData.books
                setBooks(results)
                return results
            })
            .catch(err => {
                console.log(err)
            })
    }

    const deleteBook = function (payload : any) {
        const data = {
            url : `${booksUrl}/${payload}`,
        }
        return deleteApi(data)
            .then(() => {
                return fetchBooks() 
            })
    }

    const editBook = function (payload : any) {
        const data = {
            url : `${booksUrl}/${payload.id}`,
            data : {...payload.params}
        }
        return putApi(data)
            .then(() => {
                return fetchBooks()
            })
            .catch(err => {
                console.log(err)
            })
    }

    const addBook  = function (payload : any) : Promise<any>  {
        const data = {
            url : booksUrl,
            params :  {...payload}
        }
        return postApi(data) 
            .then(response => {
                return fetchBooks()
            })
            .catch(err => {
                throw err
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
        editBook,
        addBook,
        deleteBook
    }
    return <BookContext.Provider value={contextValue} >{props.children}</BookContext.Provider>
} 

export default BookContextProvider