"use client";
import { redirect } from "next/navigation";
import { useEffect } from "react";
export default function WithAuth(Component : any) {
   
    return function checkStorage(props : any) {
        useEffect(() => {
            const token = ''
            if(token) {
                redirect('/')
            }else{
                redirect('/login')
            }
        },[])
        return <Component {...props} />
    }
}