import { useState } from 'react'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import './App.css'
const makeRequestAPI =async(prompt) => {
  const res = await axios.post('http://localhost:3030/generate',{prompt});
  return res.data;
}


function App() {
  

  const [prompt,setPrompt] = useState("")
  const mutation= useMutation({
    mutationFn: makeRequestAPI,
    mutationKey:['gemini-api-req']
  })
  
  const submitHandler=(e)=>{
    e.preventDefault();
    mutation.mutate(prompt)
  }
  console.log(mutation)
  return (
    <div>
      <header>Finance Information Provider</header>
      <p>ask anything about finances</p>
      <form className='App-form' onSubmit={submitHandler}>
        <label htmlFor='Enter your message'></label>
        <input type='text' value={prompt} onChange={(e)=>setPrompt(e.target.value)} 
        placeholder='Enter Your Doubt' className='App-input'></input>
        <button type='submit' className='App-button'>Submit</button>
      </form>
      <section className='App-response'>
        {mutation.isPending && <p>Please Wait</p>}
        {mutation.isError && <p>{mutation.error.message}</p>}
        {mutation.isSuccess && <p>{mutation.data}</p>}

      </section>
    </div>
  )
}

export default App
