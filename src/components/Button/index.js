import React from 'react'

const  Button = ({
    type,
    label,
    disabled,
    className,
    onClick,
    Icons,
    rIcons
}) => {
  return (
    <>
    <button onClick={onClick} type={type} className={`px-6  text-center  flex items-center justify-center gap-1   ${className}`} disabled={disabled}> {Icons} {label}  {rIcons} </button>
    </>
    
  )
}

export default Button