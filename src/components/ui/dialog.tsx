"use client"

import { useEffect, ReactNode, useContext } from 'react'
import { z } from "zod";
import { Button } from "@/components/container/button"
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { BookContext } from "@/context/bookContext";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
interface Props {
  children?: ReactNode,
  title: string,
  isDialog: boolean,
  closeDialog: (status: boolean) => void,
  book? : any
}

const STATUS_SCHEMAS = [
  z.literal("listed"),
  z.literal("read"),
  z.literal("finished"),
] as const;

const bookFormSchema = z.object({
  list_name: z.string().min(1, 'The Field is required'),
  display_name: z.string().min(1, 'The Field is required'),
  list_name_encoded: z.string().min(1, 'The Field is required'),
  oldest_published_date: z.string().min(1, 'The Field is required'),
  newest_published_date: z.string().min(1, 'The Field is required'),
  updated: z.string().min(1, 'The Field is required'),
  status: z.string({
    required_error: "Please select a status to display.",
  })
})
type BookFormSchema = z.infer<typeof bookFormSchema>
function DialogComponent({ book, title, isDialog, closeDialog }: Props) {
  const form = useForm<BookFormSchema>({
    resolver: zodResolver(bookFormSchema),
    defaultValues : {
      list_name : ''
    }
  })
  const { handleSubmit, control, reset } = form
  const {  editBook, addBook , deleteBook} = useContext(BookContext)

  const onSubmit =  handleSubmit((values) => {
    const id = book._id
    const temp = {...values}
    if(id) {
      const payload = {
        params : {...temp},
        id
      }
      return editBook(payload)

    }else{
      const payload = {
        ...temp
      }
    
      return addBook(payload)
        .then(() => {
          closeDialog(false)
        })
      
    }
  })

 

  useEffect(() => {
    reset(book)
  }, [book]);
  return (
    <Dialog
      open={isDialog}
      onClose={closeDialog}
      className="relative z-10"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div >
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                    {title}
                  </DialogTitle>
                  <Form  {...form}>
                    <form onSubmit={onSubmit} className="grid w-full items-center gap-4" >
                      <FormField
                        control={control}
                        name="list_name"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>List Name</FormLabel>
                              <FormControl><Input type="text" {...field} /></FormControl>
                              <FormMessage></FormMessage>
                            </FormItem>
                          )
                        }}
                      >
                      </FormField>

                      <FormField
                        control={control}
                        name="list_name_encoded"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>List Name Encoded</FormLabel>
                              <FormControl><Input type="text" {...field} /></FormControl>
                              <FormMessage></FormMessage>
                            </FormItem>
                          )
                        }}
                      >
                      </FormField>

                      <FormField
                        control={control}
                        name="display_name"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>Display Name</FormLabel>
                              <FormControl><Input type="text" {...field} /></FormControl>
                              <FormMessage></FormMessage>
                            </FormItem>
                          )
                        }}
                      >
                      </FormField>
                      <FormField
                        control={control}
                        name="newest_published_date"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>Newest Published</FormLabel>
                              <FormControl><Input type="text" {...field} /></FormControl>
                              <FormMessage></FormMessage>
                            </FormItem>
                          )
                        }}
                      >
                      </FormField>
                      <FormField
                        control={control}
                        name="oldest_published_date"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>Oldest Published</FormLabel>
                              <FormControl><Input type="text" {...field} /></FormControl>
                              <FormMessage></FormMessage>
                            </FormItem>
                          )
                        }}
                      >
                      </FormField>
                      <FormField
                        control={control}
                        name="updated"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>Updated</FormLabel>
                              <FormControl><Input type="text" {...field} /></FormControl>
                              <FormMessage></FormMessage>
                            </FormItem>
                          )
                        }}
                      >
                      </FormField>
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a status to display" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="listed">Listed</SelectItem>
                                <SelectItem value="read">Read</SelectItem>
                                <SelectItem value="finished">Finished</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className='' >Submit</Button>
                    </form>

                  </Form>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

DialogComponent.displayName = 'DialogComponent';


export default DialogComponent