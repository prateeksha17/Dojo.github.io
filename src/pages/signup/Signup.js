//styles
import styles from './Sign.module.css'
import React, { useState } from 'react'
import { UseSignup } from '../../hooks/UseSignup'



export default function Signup() {

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [displayName,setDisplayName] = useState('')
  const [thumbnail,setThumbnail] = useState('')
  const [thumbnailError,setThumbnailError] = useState('')

  const {signup,isPending,error} = UseSignup()

const handleFileChange = (e) =>{
  setThumbnail(null)
  let selected = e.target.files[0]
  console.log(selected)

  if(!selected){
    setThumbnailError('Please Select a file.')
    return
  }
  if(!selected.type.includes('image')){
    setThumbnailError('Selected File must be an Image')
    return
  }
  if(selected.size > 100000){
    setThumbnailError('Image File size ust be less than 100kb')
    return
  }

  setThumbnailError(null)
  setThumbnail(selected)
  console.log('thumbnail updated')
}

const handleSubmit =(e)=>{
e.preventDefault()
signup(email,password,displayName,thumbnail)
}

  return (
    <form onSubmit={handleSubmit} className={styles['signup-form']}>
    <h2>SignUp</h2>
    <label>
      <span>Email:</span>
      <input
      required
         type="email"
         onChange={(e)=> setEmail(e.target.value)}
         value={email}
      />
    </label>
    <label>
      <span>Password:</span>
      <input
      required
         type="password"
         onChange={(e)=> setPassword(e.target.value)}
         value={password}
      />
    </label>
    <label>
      <span>Display Name:</span>
      <input
      required
         type="text"
         onChange={(e)=> setDisplayName(e.target.value)}
         value={displayName}
      />
    </label>
    <label>
      <span>Profile Thumbnail:</span>
      <input
      required
         type="file"
         onChange={handleFileChange}
       />
       {thumbnailError && <div className='error'>{thumbnailError}</div>}
    </label>

    {!isPending && <button className='btn'>SignUp</button>}
    {isPending && <button className='btn' disabled>loading</button>}
    {error && <p className='error'>{error}</p>}
  </form>
  )
}
