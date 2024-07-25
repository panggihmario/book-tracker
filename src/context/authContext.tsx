"use client"; // This is a client component 

import { createContext, useEffect, useState } from "react"
import { postApi } from "@/lib/axios";
import { LoginFormSchema } from "@/app/login/page";
import { useRouter } from 'next/navigation'
import useLocalStorage from "@/components/hook/useLocalStorage";
interface MyAuthProps {
  children?: React.ReactNode;
}
type AuthContextObj = {
  handleLogin: (values: LoginFormSchema) => void,
  handleLogout : () => void,
  isLogin: boolean,
  isLoading : boolean
}

export const AuthContext = createContext<AuthContextObj>({
  handleLogin: () => { },
  handleLogout : () => {},
  isLogin: false,
  isLoading : false
})

const AuthContextProvider: React.FC<MyAuthProps> = (props) => {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [value, setValue, removeValue] = useLocalStorage("token", "")

  const handleLogin = function (values: LoginFormSchema) {
    setIsLoading(true)
    const data = {
      url: 'https://dummyjson.com/auth/login',
      params: {
        username: values.username,
        password: values.password
      }
    }
    return postApi(data)
      .then(response => {
        const responseData = response.data
        const token = responseData.token
        setIsLoading(false)
        setValue(token)
        router.push('/')
        setIsLogin(true)
      })
      .catch(err => {
        setIsLogin(false)
        setIsLoading(false)
      })
  }

  const handleLogout = function () {
    removeValue()
    router.push('/login')
  }

  const contextValue: AuthContextObj = {
    handleLogin,
    isLogin,
    isLoading,
    handleLogout,
  }

  return <AuthContext.Provider value={contextValue} >{props.children}</AuthContext.Provider>
}

export default AuthContextProvider