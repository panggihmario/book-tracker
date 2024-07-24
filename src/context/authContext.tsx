"use client"; // This is a client component 

import { createContext, useState } from "react"
import { postApi } from "@/lib/axios";
import { LoginFormSchema } from "@/app/login/page";
interface MyAuthProps {
  children?: React.ReactNode;
}
type AuthContextObj = {
  handleLogin: (values: LoginFormSchema) => void,
  isLogin: boolean,
}

export const AuthContext = createContext<AuthContextObj>({
  handleLogin: () => { },
  isLogin: false,
})

const AuthContextProvider: React.FC<MyAuthProps> = (props) => {
  const [isLogin, setIsLogin] = useState(false)
  const [token ,setToken] = useState('')
  const handleLogin = function (values: LoginFormSchema) {
    const data = {
      url: 'https://dummyjson.com/auth/login',
      params: {
        username: values.username,
        password: values.password
      }
    }
    return postApi(data)
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err.response)
      })
  }
  const contextValue: AuthContextObj = {
    handleLogin,
    isLogin,
  }

  return <AuthContext.Provider value={contextValue} >{props.children}</AuthContext.Provider>
}

export default AuthContextProvider