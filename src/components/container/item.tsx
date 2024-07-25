import { useContext } from "react"
import { BookContext } from "@/context/bookContext"
import { Button } from "@/components/ui/button"
const  Item : React.FC<{book : any}> = ({
    book
}) => {
    const { addBook} = useContext(BookContext)
    const handleClick =  function (params : any) {
        return addBook(params)
    }
    return (
        <li  className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">{book.display_name}</p>
                    {/* <p role="button" className="inline-block p-1 rounded-md border-black border-2 mt-1 truncate text-xs leading-5 text-gray-500">Add Book</p> */}
                    <Button onClick={() => handleClick(book)} variant={'outline'} size={'sm'} >Add Book</Button>
                </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">{book.updated}</p>
                <p className="text-sm leading-6 text-gray-900">{book.newest_published_date}</p>
            </div>
        </li>
    )
}

export default Item