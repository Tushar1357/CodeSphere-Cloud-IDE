import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import NavBar from './components/NavBar'
import Home from './components/Home'

function App() {
  return (
    <div>
      <NavBar LoggedIn={true} />
      <Home />
    </div>
  )
}

export default App