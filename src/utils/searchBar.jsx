import React from "react";



export const SearchBar = ({placeholder, onChange, value}) => {
    return (
       <input 
       className="form-control"
       type='search'
       placeholder={placeholder}
       onChange={ e=> onChange(e.currentTarget.value)}
       value={value}
       />)
}

