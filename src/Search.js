import React, { useState } from 'react'

export default function Search(){
    return(
        <div>
            <h1>Search</h1>
            <input className="search-input" onChange={(e) => searchData(e)} />
            <br></br>
            <span>{searchInput}</span>
        </div>
    )
}

const Token = "pk_eb5e2384ca5e4c4fb810994a409ae48e"
const baseUrl = "https://cloud.iexapis.com/stable"

const searchData = (input) =>{
    console.log(input.target.value);
  fetch(`${baseUrl}/search/${input.target.value}?token=${Token}`)
    .then(data => data.json())
    .then(x => console.log(x))
}