"use client"; // This is a client component 
import WithAuth from "@/components/hoc/withAuth"
import { useEffect, useContext, useState } from "react";
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
import { Button } from "@/components/container/button"
import DialogComponent from "@/components/ui/dialog";

const Home = () => {
  const { fetchBooks, books } = useContext(BookContext)
  const [dialog, setDialog] = useState<boolean>(false)
  const [bookItem, setBookItem] = useState({})

  const openDialog = function (book : any) {
    setDialog(true)
    if(book) {
      setBookItem(book)
    }else{
      setBookItem({})
    }
  }

  const closeDialog = function (status : boolean) {
    setDialog(status)
  }
  useEffect(() => {
    fetchBooks()
  }, [])
  return (
    <div>
      <DialogComponent book={bookItem} closeDialog={closeDialog} isDialog={dialog} title="Form Book"></DialogComponent>
      <Button onClick={openDialog}>Add New Books</Button>
      <Table>
        <TableCaption>A list of your New york books.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead >Name</TableHead>
            <TableHead className="w-[200px]">Published</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books && books.map((book, idx) => {
            return (
              <TableRow key={idx}>
                <TableCell className="font-medium">{book.display_name}</TableCell>
                <TableCell>{book.newest_published_date}</TableCell>
                <TableCell>{book.updated}</TableCell>
                <TableCell>{book.status}</TableCell>
                <TableCell className="text-center flex gap-2 justify-center">
                  <Button onClick={() => openDialog(book)}>Edit</Button>
                  <Button>Delete</Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>

  );
}

export default WithAuth(Home)
