import { useState } from 'react'
import EditProfil from '../components/EditProfil'
import UserData from '../components/UserData'

const UserProfilePage = () => {
  const [editMode, setEditMode] = useState(false)

  return editMode ? <EditProfil exitEditMode={setEditMode} /> : <UserData openEditMode={setEditMode} />
}

export default UserProfilePage
