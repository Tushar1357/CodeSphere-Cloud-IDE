import React, { useState } from 'react'
import NavBar from './NavBar'
import LoginPageBody from './LoginPageBody'
import LoginModal from './LoginModal'

function Login() {

  const [loginModalOpen, setLoginModal] = useState(false)

  const openLoginModal = ()=>{
    setLoginModal(!loginModalOpen)
  }
  return (
    <>
      <NavBar LoggedIn={false} code={false} handleClick = {openLoginModal} />
      <LoginPageBody status={loginModalOpen} handleClick={openLoginModal} />
    </>
  )
}

export default Login