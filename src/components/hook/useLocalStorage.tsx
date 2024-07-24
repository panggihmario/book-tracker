"use client";
import { useState } from "react"

const useLocalStorage = (key : any, initialValue : any) => {
  const [state, setState] = useState(() => {
    // Initialize the state
    try {
      const value = typeof window !== "undefined" && window.localStorage.getItem(key)
      return value ? JSON.parse(value) : initialValue
    } catch (error) {
      console.log(error)
    }
  })

  const setValue = (value : any)  => {
    try {
      const valueToStore = value instanceof Function ? value(state) : value
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
      setState(value)
    } catch (error) {
      console.log(error)
    }
  }

  const removeValue = function () {
    try {
        setValue('')
        window.localStorage.removeItem('token')
    }catch(error) {
        console.log(error)
    }
  }

  return [state, setValue, removeValue]
}

export default useLocalStorage