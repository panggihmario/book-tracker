"use client"; // This is a client component 
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import useLocalStorage from "../hook/useLocalStorage";
export default function WithAuth(Component : any) {
    
    return function checkStorage(props : any) {
        const [value] = useLocalStorage("token", "")
        const [test, setTest] = useState()
        const token =  value
        useEffect(() => {
            setTest(value)
            if(!token) {
                redirect('/login')
            }
        },[])

        // if(!token) {
        //     return null
        // }

        return <Component {...props} ></Component>
    }
}