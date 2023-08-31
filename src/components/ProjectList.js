import React from 'react'
import { Link } from 'react-router-dom'
import Avtar from '../components/Avtar'
//styles
import './ProjectList.css'

export default function ProjectList({projects}) {
  return (
    <div className='project-list'>
       {projects.length === 0 && <p>No projects yet!</p>}
       {projects.map(project =>(
        <Link to={`/projects/${project.id}`} key={project.id}>
           <h4>{project.name}</h4>
            <p>Due to {project.dueDate.toDate().toDateString()}</p>
            <div className='assigned-to'>
                <ul>
                    {project.assignedUserList.map(user=>(
                        <li key={user.photoURL}>
                            <Avtar src={user.photoURL}/>
                        </li>
                    ))}
                </ul>
            </div>
        </Link>
       ))}

    </div>
  )
}
