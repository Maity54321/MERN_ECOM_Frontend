import React from 'react'
import Account from '../users/Account'
import { decodeToken } from 'react-jwt'

const AdminWelcome = ({logout}) => {

  const user = decodeToken(localStorage.getItem("token"));

  return (
    <>
      <Account userProfile={user} logout={logout} />
        
    </>
  )
}

export default AdminWelcome
