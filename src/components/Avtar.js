import React from 'react'

//styles
import './Avtar.css'

export default function Avtar({src}) {
  return (
    <div className='avtar'>
        <img src={src} alt='...'/>
    </div>
  )
}
