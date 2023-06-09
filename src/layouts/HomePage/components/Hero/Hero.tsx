import './hero.css'
import {useEffect, useState} from 'react';
import feature1 from '../../assets/Wethreeheads01.jpeg'
import feature2 from '../../assets/Brokengrid01.jpeg'
import logo from '../../../../assets/AlgorythmiaLogotypeGif.gif'
import video from '../../../../assets/PosterMockup.mp4'
import can from '../../assets/can.png'
import graySquare from '../../../../assets/graySquare.jpg'
// import App from '../../App'
import App from '../../../../App';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom'
const Hero = (props) => {

  

  const [products, setProducts] = useState(null)
  const [productSizes, setProductSizes] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  

  const scrollToTop = () => {
    window.scrollTo(0, 0)
}

  useEffect(() => {

    const fetchProducts = async () => {
      const baseUrl = 'https://18.217.214.80:8080/api/products'
      const url = `${baseUrl}?page=0&size=20`;


      const response = await fetch(url);
      // console.log(response)


      if(!response.ok) {
        throw new Error('Something went wrong!')
      }

      const responseJson = await response.json();
      const responseData = responseJson._embedded.products

      setProducts(responseData)
      setIsLoading(false)

      
      
      console.log(products[0].id)
      console.log(products[0])
    };
    fetchProducts().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message)

    })

  }, [])  

  // useEffect(() => {
  //   console.log(products)
  // },products)


  

  return (
    <div className='hero'>
      <div className='title-container'>
        <img className='title' src={logo}/>
        <div className='phrase'> ● YOU MAY HAVE IT</div>
      </div>
      <div className='featured-container'>
        <div  className='container1' id="cart_Sheep" >
        { isLoading ? <div></div> : <Link onClick={scrollToTop} to={`productpage/${products[0].id}`} ><img className='container1-image' src={products[0].imageUrl}/></Link>}
          <div className='container1-product-price-container'>
            <div className='container1-product-title'>{isLoading ? <div></div> : products[0].name}</div>
            <div className='container1-price'>{isLoading ? <div></div> : `$${products[0].unitPrice}`}</div>
          </div>
        </div>
        <div className='container2'>
        { !isLoading ? <Link onClick={scrollToTop}  to={`productpage/${products[1].id}`} ><img className='container1-image' src={products[1].imageUrl}/></Link> : <div></div>}
          <div className='container2-product-price-container'>
            <div className='container2-product-title'>{isLoading ? <div></div> : products[1].name}</div>
            <div className='container2-price'>{isLoading ? <div></div> : `$${products[1].unitPrice}`}</div>
          </div>
        </div>
        <div className='info'>
            <h6>FEATURED</h6>
            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.</p>
        </div>
      </div>
      <div className='video' >
        <video style={{borderRadius: '12px'}} src={video} width="100%" autoPlay muted loop >
        </video>
      </div>
    </div>
  )
}

export default Hero