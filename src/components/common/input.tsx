"use client"

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  IoEyeOutline,
  IoEyeOffOutline
} from "react-icons/io5";

const InputText = ({
  className, containerClassName, id, placeholder, type, ...props
}: {containerClassName?: string; } & React.ComponentProps<"input">) => {
  return (
    <div className={cn("relative", containerClassName)}>
      <label htmlFor={id} className="sr-only">{placeholder}</label>
      <input id={id} type={type} placeholder={placeholder}
        className={cn("text-white", className)} {...props}
      />
    </div>
  )
}

const InputPassword = ({
  className, id, placeholder, ...props
}: React.ComponentProps<"input">) => {
  const [inputType, setInputType] = useState("password");

  const toggleShowHide = () => {
    setInputType(prevType => (prevType === "password" ? "text" : "password"))
  }
  
  return (
    <div className="relative">
      <label htmlFor={id} className="sr-only">{placeholder}</label>
      <input id={id} type={inputType} placeholder={placeholder}
        className={cn("text-white", className)} {...props}
      />
      <div className="icon-container" onClick={toggleShowHide}>
        {inputType === "password" ?
          <IoEyeOffOutline className="size-5" color="#F3EDA6" /> :
          <IoEyeOutline className="size-5" color="#F3EDA6" />}
      </div>
    </div>
  )
};

export {
  InputText,
  InputPassword
};
