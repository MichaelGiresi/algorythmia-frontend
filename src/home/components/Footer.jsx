import footer from '../styles/footer/footer.css'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
const Footer = () => {

  return (

    <div className='footer'>
      <Link to='/products' onClick={() => window.scrollTo(0, 0)} href="#top" className='footer-shop-all'>Shop All</Link>
      <div className='footer-oval'></div>
    </div>
    
  )
}
 
export default Footer