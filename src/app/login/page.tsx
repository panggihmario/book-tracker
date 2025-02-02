"use client"; // This is a client component 

import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/container/button"
import { useForm } from "react-hook-form";
import { z } from "zod";
import React, { useContext} from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { AuthContext } from "@/context/authContext";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

const loginFormSchema = z.object({
    username: z.string().min(1, 'The username field is required'),
    password: z.string().min(1, 'The password field is required')
})

export type LoginFormSchema = z.infer<typeof loginFormSchema>

const Login = function () {
    const {handleLogin, isLoading} = useContext(AuthContext)
    const form = useForm<LoginFormSchema>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            username: "",
            password : '' 
          },
    })
    const { handleSubmit, control } = form
    const onSubmit = handleSubmit((values) => {
        return handleLogin(values )
    })
    return (
        <div className="h-screen flex justify-center items-center">
            <Card className="w-[350px]">
                <Form {...form}>
                    <form  onSubmit={onSubmit}>
                        <div className="grid w-full items-center gap-4">
                            <FormField
                                control={control}
                                name="username"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>Username</FormLabel>
                                            <FormControl><Input type="text" {...field} /></FormControl>
                                            <FormMessage></FormMessage>
                                        </FormItem>
                                    )
                                }}
                            >
                            </FormField>
                            <FormField
                                control={control}
                                name="password"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl><Input type="text" {...field} /></FormControl>
                                            <FormMessage></FormMessage>
                                        </FormItem>
                                    )
                                }}
                            >
                            </FormField>
                            <Button type="submit">
                                {isLoading ? 'Loading..' : 'Login'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </Card>
        </div>
    )
}

export default Login