import React from 'react'
import { Link } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'
const Error = () => {

  // let navigate = useNavigate();
  const a = <a></a>
  return (

    <div style={{color: '#c3c3c3', display: 'flex', justifyContent: 'center'}}>
    <p color='red'>{`You seem lost, let's go `}
      <Link style={{color: '#c3c3c3'}} to="/home">home</Link>
      {` :)`}
    </p></div>
  )
}

export default Error