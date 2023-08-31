import React from 'react'
import { UseCollection } from '../hooks/UseCollection'
import Avtar from './Avtar'

//styles
import './OnlineUsers.css'

export default function OnlineUsers() {
    const {error, documents } = UseCollection('users')
  return (
    <div className='user-list'> 
       <h2>All Users</h2>
       {error && <div className='error'>{error}</div>}
       {documents && documents.map(user=>(
        <div key={user.id} className='user-list-item'>
            {user.online && <span className='online-user'></span>}
            <span>{user.displayName}</span>
            <Avtar src={user.photoURL}/>
            </div>
       ))}
    </div>
  )
}
