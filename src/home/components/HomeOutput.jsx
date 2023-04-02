import React from 'react'
import Hero from './Hero'
import Upcomming from './Upcomming'
import Footer from './Footer'

const HomeOutput = (props) => {
  return (
    <div className='app'>
      <Hero cartCount = {props.cartCount} setCartCount = {props.setCartCount}/>
      <Upcomming/>
      <Footer/>
    </div>
  )
}

export default HomeOutput