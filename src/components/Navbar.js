import React from 'react'
import { Link } from 'react-router-dom'
import { UseLogout } from '../hooks/UseLogout'
import { UseAuthContext } from '../hooks/UseAuthContext'

//styles
import './Navbar.css'
import Temple from '../assets/temple.svg'

export default function Navbar() {
  const {user} = UseAuthContext()
  const { logout, isPending } = UseLogout()
  return (
    <div className='navbar'>
        <ul>
            <li className='logo'>
                <img src={Temple} alt='...'/>
            </li>
{!user && (<>
           <li><Link to='/login'>Login</Link></li>
            <li><Link to='/signup'>SignUp</Link></li> 
            </>
            )}
            {user && (
            <li>
                {!isPending && <button className='btn' onClick={logout}>Logout</button>}
                {isPending && <button className='btn' disabled>Logging out...</button>}
            </li>
            )}
        </ul>
    </div>
  )
}
