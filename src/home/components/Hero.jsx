import hero from '../styles/hero/hero.css'
import {useEffect, useState} from 'react';
import feature1 from '../../assets/Wethreeheads01.jpeg'
import feature2 from '../../assets/Brokengrid01.jpeg'
import logo from '../../assets/AlgorythmiaLogotypeGif.gif'
import video from '../../assets/PosterMockup.mp4'
import can from '../../assets/can.png'
import App from '../../App'
const Hero = (props) => {

  const [products, setProducts] = useState('')
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttopError] = useState(null);

  useEffect(() => {

    const fetchProducts = async () => {
      const baseUrl = 'http://localhost:8080/api/product-category'
      const url = `${baseUrl}?page=0&size=9`;

      const response = await fetch(url);
      console.log(response)

      if(!response.ok) {
        throw new Error('Something went wrong!')
      }

      const responseJson = await response.json();
      const responseData = responseJson._embedded.productCategory
      console.log(responseData)
      console.log(responseData[0])
    };
    fetchProducts().catch((error) => {
      setIsLoading(false);
      setHttopError(error.message)
    })

  }, [])














  const a = props.setCartCount
  const b = props.cartCount
  const c = props.sizeSmall



  const selectSize = () => {
    document.getElementById('sheep-small')
    document.getElementById('sheep-medium')
    document.getElementById('sheep-large')
    document.getElementById('sheep-extra-small')



  }

  return (
    <div className='hero'>
      <div className='title-container'>
        <img className='title' src={logo}/>
        <div className='phrase'> ● YOU MAY HAVE IT</div>
      </div>
      <div className='featured-container'>
        <div className='container1' id="cart_Sheep">
          <img className='container1-image'src={feature1}/>
          <div className='container1-product-price-container'>
            <div className='container1-product-title'>Sheep</div>
            <div className='container1-price'>$30</div>
          </div>
        </div>
        <div id="test-container">
        <div id="test">
          <div id="sheep_sizes">
            <h3 id='sheep-small'>Small</h3>
            <h3 id="sheep-medium">Medium</h3>
            <h3 id="sheep-large">Large</h3>
            <h3 id="sheep-extra-large">Extra Large</h3>
          </div>
          <div className='test2'>
          <div id="test-cart-product-increment">
                <div id="cart-increment-remove" onClick={() => {a(b - 1)}}>{b < 1? '' : "-" }</div>
                <div id="cart-increment">{props.cartCount}</div>
                <button id="cart-increment-add" onClick={() => {a(b + 1)}}>+</button>
              </div>
          <button id='sheep-add-to-cart-button'>Add to Cart</button>
          </div>
        </div>
        <div id="testt">
          <div id="sheep_sizes">
            <h3 id='sheep-small'>Small</h3>
            <h3 id="sheep-medium">Medium</h3>
            <h3 id="sheep-large">Large</h3>
            <h3 id="sheep-extra-large">Extra Large</h3>
          </div>
          <div className='test2'>
          <div className="cart-product-increment">
                <div id="cart-increment-remove" onClick={() => {a(b - 1)}}>{b < 1? '' : "-" }</div>
                <div id="cart-increment">{props.cartCount}</div>
                <button id="cart-increment-add" onClick={() => {a(b + 1)}}>+</button>
              </div>
          <button id='sheep-add-to-cart-button'>Add to Cart</button>
          </div>
        </div>
        <div id="testtt">
          <div id="sheep_sizes">
            <h3 id='sheep-small'>Small</h3>
            <h3 id="sheep-medium">Medium</h3>
            <h3 id="sheep-large">Large</h3>
            <h3 id="sheep-extra-large">Extra Large</h3>
          </div>
          <div className='test2'>
          <div className="cart-product-increment">
                <div id="cart-increment-remove" onClick={() => {a(b - 1)}}>{b < 1? '' : "-" }</div>
                <div id="cart-increment">{props.cartCount}</div>
                <button id="cart-increment-add" onClick={() => {a(b + 1)}}>+</button>
              </div>
          <button id='sheep-add-to-cart-button'>Add to Cart</button>
          </div>
        </div>
        </div>
        <div className='container2'>
          <img className='container2-image' src={feature2}/>
          <div className='container2-product-price-container'>
            <div className='container2-product-title'>Broken Order</div>
            <div className='container2-price'>$300</div>
          </div>
        </div>
        <div className='info'>
            <h6>FEATURED</h6>
            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.</p>
        </div>
      </div>
      <div className='video' >
        <video style={{borderRadius: '12px'}} src={video} width="100%" autoPlay muted loop ></video>
      </div>
    </div>
  )
}

export default Hero