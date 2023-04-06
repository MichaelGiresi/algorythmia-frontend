import { Link } from "react-router-dom"
import Cart from "../../../Cart/Cart"
import { useState, useEffect, useContext, useRef } from "react"
import '../../../Cart/cart.scss'
import can from '../../../../assets/can.png'
import { CartContext } from "../../../../Contexts/CartContext"



// What we want to do

//  The cart is now in the nav component. The nav component is always rendered in the app component, regardless of any other active component

// We want to update the cart from any product page. The cart state must be maintained no matter page we are on.

//  This means we have to store the state of the cart locally in local storage

//  Local storage can only store strings. So every value must be a string.

//  These values must be converted: id, size, unit_Price. All other relevant elements are strings

// The primary question is:

        // Can we update the cart from the product page selected elements? This has to be done from the product page.




const Nav = () => {

  const cartContext = useContext(CartContext)

  



  const Hamburger = () => {
    const hamburgerId = document.getElementById('hamburgerId')
    const hamburgerButton = document.getElementById('hamburger-button')
    const html = document.getElementById('algo__html');

    if (cartContext?.hamburger) {
      cartContext?.setHamburger(false)
      hamburgerId.classList.toggle('open')
      // html.classList.remove('stop-scrolling')

    } else {
      cartContext?.setHamburger(true)
      hamburgerId.classList.toggle('open')
      // html.classList.add('stop-scrolling')
    }
  }

  // const HamburgerCart = () => {
  //   const hamburgerId = document.getElementById('hamburgerId')
  //   const cartId = document.getElementById('cartId')
  //   const html = document.getElementById('algo__html');

  //   if (HamburgerCart) {

  //     hamburgerId.classList.toggle('open')
  //     cartId.classList.toggle('open')
  //     // html.classList.add('stop-scrolling')
  //   }
  // }

  const HamburgerAbout = () => {
    const hamburgerId = document.getElementById('hamburgerId')
    const aboutPage = document.getElementById('about-page')

    hamburgerId.classList.toggle('open')
    aboutPage.classList.toggle('show')
  }

  const aboutPage = () => {
    const aboutPage = document.getElementById('about-page')

    if (cartContext?.about) {
      cartContext?.setAbout(false)
      aboutPage.classList.toggle('show')
      console.log(cartContext?.about)
      document.body.style.position = ''

    } else {
      cartContext?.setAbout(true)
      aboutPage.classList.toggle('show')
      document.body.style.position = 'fixed'
      document.body.style.right = '0'
      document.body.style.top = '0'
      document.body.style.bottom = '0'
      document.body.style.left = '0'
      document.body.style.margin = 'auto'
      console.log(cartContext?.about)
    }
  }

  useEffect(() => {

    if(cartContext?.localCartItems.length  !== 0) {

      const cartRemoveCounter = document.getElementById('cart-increment-remove')
      const cartProductInfo = document.getElementById('cart-product-info-id')
      const cartSubtotal = document.getElementById('cart-subtotal-id')
      const cartPromo = document.getElementById('cart-promo-continue-id')
      const cartPayChoice = document.getElementById('cart-pay-choice-id')
      const cartMaster = document.getElementById('cartId')
      
      if(cartContext?.cartCount === 1) {
        cartRemoveCounter.style.padding ='0px'
      } 
      else {
        cartRemoveCounter.style.marginTop ='-2px'
        cartRemoveCounter.style.padding =''
      }
      
      if(cartContext?.cartCount === 0) {
    cartProductInfo.style.display ='none'
    cartSubtotal.style.display ='none'
    cartPromo.style.display ='none'
    cartPayChoice.style.display ='none'
    const empty = document.createElement('h1')
    empty.style.color = 'white'
    empty.style.fontFamily = 'JetBrains Mono'
    empty.style.textAlign = 'center'
    // empty.innerHTML = 'Your Cart is Empty!'
    cartMaster.appendChild(empty)
  }
}
},[cartContext?.cartCount, cartContext?.localCartItems])

const cartRemove = (index) => {
  console.log(index)
  const newCart = cartContext?.localCartItems.splice(index, 1)
  cartContext?.setLocalCartItems(newCart)


  
}
 const Cart = () => {
  const cartId = document.getElementById('cartId')
  const cartButton = document.getElementById('cart-button')
  const cartOverlay = document.getElementById('cart-left-overlay-id')
  const html = document.getElementById('algo__html'); 
  
  if(cartContext?.cart) {
    cartContext?.setCart(false) 
    cartId.classList.toggle('open')
    cartOverlay.classList.toggle('open')
    console.log(cartContext?.cart)
    html.classList.remove('stop-scrolling')
  } else {
    cartContext?.setCart(true) 
    cartId.classList.toggle('open')
    cartOverlay.classList.toggle('open')
    console.log(cartContext?.cart)
    // html.classList.add('stop-scrolling')
  }
}

  const cartExit = () => {
    const cartId = document.getElementById('cartId')
    const cartOverlay = document.getElementById('cart-left-overlay-id')
    const html = document.getElementById('algo__html');
    cartContext?.setCart(false)
    cartContext?.setHamburger(false)
    cartId.classList.remove('open')
    cartOverlay.classList.remove('open')
    // html.classList.remove('stop-scrolling')
  }


  const HamburgerCart = () => {
    const hamburgerId = document.getElementById('hamburgerId')
    const cartId = document.getElementById('cartId')
    const html = document.getElementById('algo__html');

    if(HamburgerCart) {

      hamburgerId.classList.toggle('open')
      cartId.classList.toggle('open') 
      // html.classList.add('stop-scrolling')
    }
  }

// const [cartItemsLocal, setCartItemsLocal] = useState([]);


// const addItemToCart = (item) => {
//   setCartItemsLocal([...cartItemsLocal, item]);
// };


// const removeItemFromCart = (item) => {
//   const newCartItems = cartItemsLocal.filter((cartItem) => cartItem.id !== item.id);
//   setCartItemsLocal(newCartItems);
// };


// const getTotalCost = () => {
//   const totalCost = cartItemsLocal.reduce((accumulator, currentItem) => accumulator + currentItem.price, 0);
//   return totalCost;
// };

  return (
    <div className='nav'>
      
      {/* About Page */}
      <div id="about-page" className="about-container" onClick={() => { aboutPage() }}>
        <div className="about-info-container">
          <h1>Algorythmia</h1>
          <h1>Algorythmia short description</h1>
          <h3>How does it work?</h3>
          <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </h4>
        </div>
      </div>


      {/* Hamburger */}
      <div className='logo-links-container'>
        <Link id='top' to="/" className="logo">A</Link>
        <div className="nav-hamburger" onClick={() => { Hamburger() }}>
          <div className="nav-hamburger-top"></div>
          <div className="nav-hamburger-middle"></div>
          <div className="nav-hamburger-bottom"></div>
        </div>
        <div id="hamburgerId">
          <button id="hamburger-button" className="hamburger-exit" onClick={() => { Hamburger() }}>X</button>
          <div className="hamburger-about" onClick={() => { HamburgerAbout() }} >About Page</div>
          <a href="/shopall" className="hamburger-shopall">Shop All</a>
          <div className="hamburger-cart" onClick={() => { HamburgerCart() }}>Cart ({cartContext?.cartCount})</div>
          
        </div>
      {/* Hamburger End */}

        {/* Nav Links */}
        <div className='links-container'>
          <Link to={'/shopall'} className="shopall">SHOP ALL</Link>
          <div id="about" className='about' onClick={() => { aboutPage() }}>ABOUT</div>
          <div className='cart' onClick={() => {Cart()}}>CART ({cartContext?.cartCount})</div>
        </div>
      </div>
      <div className='divider'></div>



    {/* DESKTOP CART */}
      <div className="cart-parent">
  <div className="cart-left-overlay" id="cart-left-overlay-id" onClick={() => {cartExit()}}>CART</div>
  <div id="cartId" className="cart-container" > 
    <div className="cart-button-container">
      <button id="cart-button" className="cart-exit" onClick={() => {cartExit()}}>X</button>
    </div>


{/*  */}
{/*  */}
{/*  */}
{/*  */}
{/* CART MAP START */}

    // individual quantity for each item


    {cartContext?.localCartItems.map((e, index) => (

      <div id="cart-product-info-id" className="cart-product-info-container">
      <div>
        <img id="testttt"  src={cartContext?.localCartItems[index].imageUrl} className="cart-product-image"/>
        <div className="cart-product-increment">
          <div id="cart-increment-remove" onClick={() => {cartContext?.setCartCount(cartContext?.cartCount - 1)}}>{cartContext?.cartCount < 2? <img  src={can} width={'25px'} height={'25px'}/> : "-" }</div>
          <div id="cart-increment">{cartContext?.cartCount}</div>
          <button id="cart-increment-add" onClick={() => {cartContext?.setCartCount(cartContext?.cartCount + 1)}}>+</button>
        </div>
      </div>
      <div className="cart-product-info-increment-wrapper">
        <div className="cart-product-info">
          <h3>{cartContext?.localCartItems[index].name}</h3>
          <h6>{cartContext?.localCartItems[index].unitPrice}</h6>
          {cartContext?.localCartItems[index].active ? <h6>In Stock</h6> : <h6>Out of Stock</h6> }
          <button className="cart-product-remove-button" id="cart-product-remove" onClick={() => {cartRemove(cartContext?.localCartItems[index].id)}}>REMOVE</button>
        </div>
        <div className="cart-product-increment-laptop">
          <button id="cart-increment-remove" onClick={() => {cartContext?.setCartCount(cartContext?.cartCount - 1)}}>-</button>
          <div id="cart-increment">{cartContext?.cartCount}</div>
          <button id="cart-increment-add" onClick={() => {cartContext?.setCartCount(cartContext?.cartCount + 1)}}>+</button>
        </div>
      </div>
    </div>

    ))}

{/* CART MAP END */}
{/*  */}
{/*  */}
{/*  */}
{/*  */}


    <div id="cart-subtotal-id" className="cart-subtotal-container">
      <div className="cart-subtotal">Subtotal</div>
      <div className="cart-value">{`$${cartContext?.cartCount * 12}`}</div>
    </div>
    <div id="cart-promo-continue-id" className="cart-promo-continue-container">
      <div className="cart-promo-title">Add Promo Code</div>
      <input className="cart-promo-input" placeholder="Enter your code"></input>
      <button className="cart-continue">Continue to Checkout</button>
    </div>
    <div id="cart-pay-choice-id" className="cart-pay-choice-container">
      <h1>Payment Methods</h1>
      <button className="cart-pay" id="cart-pay-paypal">Pay Pal</button>
      <button className="cart-pay" id="cart-pay-apple">Apple Pay</button>
      <button className="cart-pay" id="cart-pay-amazon">Amazon Pay</button>
    </div>
  </div>
</div>


      
    </div>
  )
}

export default Nav