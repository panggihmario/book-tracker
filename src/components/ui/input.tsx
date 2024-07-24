"use client"; // This is a client component 

import { ChangeEvent, HTMLProps } from "react"
import { useState } from "react"
type propsInput = HTMLProps <HTMLInputElement> & {
  label : string,
  name : string,
}

const Input : React.FC <propsInput> = ({
  label,
  type = 'text',
  name,
  ...props
}) => {

  const [validationMessage , setValidationMessage] = useState<string>("")
  const onInvalid = (e : React.FormEvent) => {
    const target = e.target as HTMLInputElement
    setValidationMessage(target.validationMessage)
  }

  const onBlur =  (e : React.FormEvent) => {
    const target  = e.target as HTMLInputElement
    if(!!validationMessage) {
      setValidationMessage(target.validationMessage)
    }
  }
  return (
    <div className="text-sm">
      <label className="text-grey text-sm font-mediun">{label}</label>
      <div className="p-2 my-1 rounded border border-whitesmoke">
        <input  
          className="focus:outline-none w-full"
          name={name}
          onChange={onInvalid}
          onBlur={onBlur}
          onInvalid={onInvalid}
          {...props}
        />
      </div>
      <div className="h-2" >
        <div className={ 'text-sm text-danger transition ease-in-out delay-150 ' + (validationMessage ?  'translate-y-0 opacity-1000' : '-translate-y-6 opacity-0')}>{validationMessage}</div>
      </div>
    </div>
  )
}

export  {Input}