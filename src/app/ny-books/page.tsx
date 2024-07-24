"use client"; // This is a client component 

import { useEffect, useContext } from "react"
import { BookContext } from "@/context/bookContext";
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
    const { fetchNyBooks, books } = useContext(BookContext)
    useEffect(() => {
        fetchNyBooks()
    }, [])
    return (
        <div>
            <Table>
                <TableCaption>A list of your New york books.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead >Name</TableHead>
                        <TableHead className="w-[200px]">Published</TableHead>
                        <TableHead>Updated</TableHead>
                        {/* <TableHead className="text-right">Amount</TableHead> */}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {books && books.map((book, idx) => {
                        return (
                            <TableRow key={idx}>
                                <TableCell className="font-medium">{book.display_name}</TableCell>
                                <TableCell>{book.newest_published_date}</TableCell>
                                <TableCell>{book.updated}</TableCell>
                                {/* <TableCell className="text-right">$250.00</TableCell> */}
                            </TableRow>
                        )
                    })}

                </TableBody>
            </Table>

        </div>
    )
}

export default NewYorkBooks