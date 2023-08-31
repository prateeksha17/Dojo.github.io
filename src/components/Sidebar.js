import React from 'react'

//styles
import './Sidebar.css'
import DashboardIcon from '../assets/dashboard_icon.svg'
import AddIcon from '../assets/add_icon.svg'
import { NavLink } from 'react-router-dom'
import Avtar from './Avtar'

import { UseAuthContext } from '../hooks/UseAuthContext'

export default function Sidebar() {
    const {user} = UseAuthContext()
  return (
    <div className='sidebar'>
         <div className='sidebar-content'>
            <div className='user'>
                <Avtar src={user.photoURL}/>
                <p>Hey {user.displayName}</p>
            </div>
            <nav className='links'>
                <ul>
                    <li>
                        <NavLink exact to='/'>
                            <img src={DashboardIcon} alt='dashboard icon'/>
                            <span>Dashboard</span>
                        </NavLink>

                        <NavLink to='/create'>
                            <img src={AddIcon} alt='add project icon'/>
                            <span>New Project</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
         </div>
    </div>
  )
}
