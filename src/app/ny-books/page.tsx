"use client"; // This is a client component 

import { useEffect, useContext } from "react"
import { Button } from "@/components/container/button";
import { BookContext } from "@/context/bookContext";
import WithAuth from "@/components/hoc/withAuth"
import Item from "@/components/container/item";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
const NewYorkBooks = () => {
    const { fetchNyBooks, nyBooks, addBook } = useContext(BookContext)
    const handleClick = function (params: any) {
        console.log(params)
        return addBook(params)
        // .then(() => {
        //     console.log('response')
        // })
    }
    useEffect(() => {
        fetchNyBooks()
    }, [])
    return (
        <ul role="list" className="divide-y divide-gray-100">
            {nyBooks && nyBooks.map((book, idx) => {
                return (
                    <Item book={book} key={idx} />
                )
            })}


        </ul>
    )
}

export default WithAuth(NewYorkBooks)