import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { UseCollection} from '../../hooks/UseCollection'
import { timestamp } from '../../firebase/Config'
import { UseAuthContext } from '../../hooks/UseAuthContext'
import {useFirestore} from '../../hooks/useFirestore'
//styles
import './Create.css'
import { useHistory } from 'react-router-dom'

const categories = [
  {value: 'planning',label:'planning'},
  {value: 'organising',label:'organising'},
  {value: 'devlopment',label:'devlopment'},
  {value: 'designing',label:'designing'},
  {value: 'overview',label:'overview'}
]

export default function Create() {
  const history = useHistory()
  const {addDocument, response } = useFirestore('projects')
  const { documents } = UseCollection('users')
  const [users, setUsers] = useState([])
  const {user} = UseAuthContext()

//form field values
const [name, setName] = useState('')
const [details, setDetails] = useState('')
const [dueDate, setDueDate] = useState('')
const [category, setCategory] = useState('')
const [assignedUsers, setAssignedUSers] = useState([])
const [formError, setFormError] = useState('')

useEffect(()=>{
  if(documents){
    const options = documents.map(user =>{
        return { value: user, label: user.displayName }
    })
    setUsers(options)
  }
},[documents])

const handleSubmit= async(e)=>{
  e.preventDefault()

  setFormError(null)
  if(!category){
    setFormError('Please select a category')
    return
  }
  if(assignedUsers.length<1){
    setFormError('Please assign the project to at least 1 user')
    return
  }

const createdBy = {
  displayName: user.displayName,
  photoURL: user.photoURL,
  id: user.uid
}

const assignedUserList = assignedUsers.map((u)=>{
  return{
    displayName: u.value.displayName,
    photoURL: u.value.photoURL,
    id: u.value.id
  }
})

const project = {
  name,
  details,
  category:category.value,
  dueDate: timestamp.fromDate(new Date(dueDate)),
  comments:[],
  createdBy,
  assignedUserList
}

 await addDocument(project)
 if(!response.error){
  history.push('/')
 }
}
  return (
    <div className='create-form'>
       <h2 className='page-title'>Create a New Project</h2>
       <form onSubmit={handleSubmit}>
<label>
  <span>Project name:</span>
  <input
  required
  type='text'
  onChange={(e) => setName(e.target.value)}
  value={name}
  />
</label>
<label>
  <span>Project details:</span>
  <textarea
  required
  type='text'
  onChange={(e) => setDetails(e.target.value)}
  value={details}
  />
</label>
<label>
  <span>Project Due Date:</span>
  <input
  required
  type='date'
  onChange={(e) => setDueDate(e.target.value)}
  value={dueDate}
  />
</label>
<label>
  <span>Assign to:  </span>
 <Select
 onChange={(option) => setAssignedUSers(option)}
 options = {users}
 isMulti
 />
</label>
<label>
  <span>Project Category:  </span>
  <Select
     onChange={(option) => setCategory(option)}
     options = {categories}
  />
</label>
<button className='btn'>Add Project</button>
{formError && <p className='error'>{formError}</p>}
       </form>
    </div>
  )
}
