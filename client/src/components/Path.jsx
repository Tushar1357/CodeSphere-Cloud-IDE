import React, { useRef } from 'react'
import { useSelector } from 'react-redux'

function Path() {
  const {currentPath} = useSelector(store=>store.path)
  return (
    <div className='text-white pb-3 ps-3' style={{backgroundColor: "rgb(33, 37, 41)"}}>{currentPath.replaceAll('/',' > ')}</div>
  )
}

export default Path