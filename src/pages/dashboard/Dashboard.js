import React from 'react'
import ProjectList from '../../components/ProjectList'
import { UseCollection } from '../../hooks/UseCollection'
import { useState } from 'react'
import {UseAuthContext} from '../../hooks/UseAuthContext'

//styles
import './Dashboard.css';
import ProjectFilter from './ProjectFilter';

export default function Dashboard() {
  const [currentFilter, setCurrentFilter]=useState('all')
const {documents, error } = UseCollection('projects')
const { user } = UseAuthContext()

const changeFilter = (newFilter)=>{
  setCurrentFilter(newFilter)
}

const projects = documents ? documents.filter((document)=>{
  switch (currentFilter){
    case 'all':
      return true
    case 'mine':
      let assignedToMe = false
     
      document.assignedUsersList.forEach((u)=>{
        if(user.uid === u.id){
          assignedToMe = true
        }
      })
      return assignedToMe
      //'all', 'mine', 'planning', 'organising', 'devlopment', 'designing', 'overview']
    case 'planning':
    case 'organising':
    case 'devlopment':
    case 'designing':
      case 'overview':
      console.log(document.category, currentFilter)
      return document.category === currentFilter
    default:
      return true
  }
}) : null

  return (
    <div>
      <h2 className='page-title'>Dashboard</h2>
      {error && <p className='error'>{error}</p>}
      {documents && <ProjectFilter currentFilter={currentFilter} changeFilter={changeFilter} />}
      {projects && <ProjectList projects={projects}/>}
    </div>
  )
}
