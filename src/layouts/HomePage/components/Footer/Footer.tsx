import { useState } from 'react'
import './footer.css'
// import '../../../../index.css'
import { Link } from 'react-router-dom'




const Footer = () => {
  const [about, setAbout] = useState(false)

  const aboutPage = () => {
    const aboutPage = document.getElementById('about-page')

    if (about) {
      setAbout(false)
      aboutPage.classList.toggle('show')
      console.log(about)
      document.body.style.position = ''

    } else {
      setAbout(true)
      aboutPage.classList.toggle('show')
      document.body.style.position = 'fixed'
      document.body.style.right = '0'
      document.body.style.top = '0'
      document.body.style.bottom = '0'
      document.body.style.left = '0'
      document.body.style.margin = 'auto'
      console.log(about)
    }
  }

  return (
    <div>
      <div className="footer-container">
        <a id='footer-algo-link' href="/">ALGORYTHMIA</a>
        <div className="footer-links-container">
          <div>TERMS OF SERVICE</div>
          <Link id='footer-shopall-link' to={'/shopall'}>SHOP ALL</Link>
          <div onClick={aboutPage}>ABOUT</div>
        </div>
      </div>
    </div>

  )
}

export default Footer