
import React, {useEffect, useState} from 'react'
import './App.css'
const App = () => {

const API_URL = 'https://api.kanye.rest/';
let [quote, setQuote]= useState('')

const changeQuote=()=>{
  fetch(API_URL)
  .then(response=>response.json())
  .then(result=>{
      console.log(result.quote)
      setQuote(result.quote)
  })
}

// this one gives only quote
/*   useEffect(()=>{
      fetch(API_URL)
      .then(response=>response.json())
      .then(result=>{
          console.log(result.quote)
          setQuote(result.quote)
      })

  },[])  */

  // This one makes the fetch call everytime changeQuote func is called and changeQuote is called on the click of the button
  useEffect(changeQuote,[])

 /* Conditional rendering so your page will not load before your state is loaded  */
 if(quote){
   return (
   /* Load your quote here */
   <div>
      <h1>My favorite Kanye quote:</h1>
      <p>{quote}</p>
      <button onClick={changeQuote}>Get a different quote </button>
   </div>
   )
 }

 return (
   <div>
      <h1>My favorite Kanye quote:</h1>
      <div>Loading...</div>
   </div>
  )
 }
export default App