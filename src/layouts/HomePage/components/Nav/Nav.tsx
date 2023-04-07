import { Link } from "react-router-dom"
import Cart from "../../../Cart/Cart"
import { useState, useEffect, useContext, useRef } from "react"
import '../../../Cart/cart.scss'
import can from '../../../../assets/can.png'
import { CartContext } from "../../../../Contexts/CartContext"
import Checkout from "../../../Checkout/Checkout"
import { useOktaAuth } from '@okta/okta-react'
import Error from "../../../../Error"



// What we want to do

//  The cart is now in the nav component. The nav component is always rendered in the app component, regardless of any other active component

// We want to update the cart from any product page. The cart state must be maintained no matter page we are on.

//  This means we have to store the state of the cart locally in local storage

//  Local storage can only store strings. So every value must be a string.

//  These values must be converted: id, size, unit_Price. All other relevant elements are strings

// The primary question is:

// Can we update the cart from the product page selected elements? This has to be done from the product page.




const Nav = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const cartContext = useContext(CartContext)

  const Hamburger = () => {
    const hamburgerId = document.getElementById('hamburgerId')
    const hamburgerButton = document.getElementById('hamburger-button')
    const html = document.documentElement;
    const body = document.body

    if (cartContext?.hamburger) {
      cartContext?.setHamburger(false)
      hamburgerId.classList.toggle('open')
      body.classList.remove('hidden');
      html.classList.remove('hidden');

    } else {
      cartContext?.setHamburger(true)
      hamburgerId.classList.toggle('open')
      body.classList.add('hidden');
      html.classList.add('hidden');

    }
  }

  const aboutPage = () => {
    const hamburgerId = document.getElementById('hamburgerId')
    const aboutPage = document.getElementById('about-page')
    const html = document.documentElement;
    const body = document.body
    if (cartContext?.about) {
      cartContext?.setAbout(false)
      cartContext?.setHamburger(false)
      aboutPage.classList.toggle('show')
      console.log(cartContext?.about)
      document.body.style.position = ''
      body.classList.remove('hidden');
      html.classList.remove('hidden');

    } else {
      cartContext?.setAbout(true)
      cartContext?.setHamburger(true)
      hamburgerId.classList.remove('open')
      aboutPage.classList.toggle('show')
      console.log(cartContext?.about)
      body.classList.add('hidden');
      html.classList.add('hidden');
    }
  }

  const cartRemove = (indexToRemove) => {
    console.log(indexToRemove)

    cartContext?.setCartCount(cartContext?.localCartItems[indexToRemove][4] - cartContext?.cartCount)
    cartContext?.setLocalCartItems(cartContext?.localCartItems.filter((_, index) => index !== indexToRemove));
  }

  const Cart = () => {
    const cartId = document.getElementById('cartId')
    const cartButton = document.getElementById('cart-button')
    const cartOverlay = document.getElementById('cart-left-overlay-id')
    const html = document.documentElement;
    const body = document.body

    if (cartContext?.cart) {
      cartContext?.setCart(false)
      cartId.classList.toggle('open')
      cartOverlay.classList.toggle('open')
      console.log(cartContext?.cart)
      body.classList.remove('hidden');
      html.classList.remove('hidden');
    } else {
      cartContext?.setCart(true)
      cartId.classList.toggle('open')
      cartOverlay.classList.toggle('open')
      body.classList.add('hidden');
      html.classList.add('hidden');
    }
  }

  const cartExit = () => {
    const cartId = document.getElementById('cartId')
    const cartOverlay = document.getElementById('cart-left-overlay-id')
    const html = document.documentElement;
    const body = document.body
    cartContext?.setCart(false)
    cartContext?.setHamburger(false)
    cartId.classList.remove('open')
    cartOverlay.classList.remove('open')
    body.classList.remove('hidden');
    html.classList.remove('hidden');
    // html.classList.remove('stop-scrolling')
  }

  const HamburgerCart = () => {
    const hamburgerId = document.getElementById('hamburgerId')
    const cartId = document.getElementById('cartId')
    const html = document.getElementById('algo__html');

    if (HamburgerCart) {

      hamburgerId.classList.toggle('open')
      cartId.classList.toggle('open')

    }
  }

  useEffect(() => {
    // let cartQuantityTotal = 0
    let a = 0
    let b = 0
    for(let i = 0; i < cartContext?.localCartItems.length; i++) {
      
      // cartContext?.setCartCount(0)
      a += cartContext?.localCartItems[i][4]
      b += cartContext?.localCartItems[i][5] * cartContext?.localCartItems[i][4] 

      console.log(cartContext?.cartCount)
      
    }
    cartContext?.setCartCount(a)
    cartContext?.setCartSubTotal(b)
  }, [cartContext?.localCartItems])

  if(!authState) {
    return <Error/>
  }

  const handleLogout = async () => oktaAuth.signOut();
  console.log(authState)
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
          <div className="hamburger-about" onClick={() => { aboutPage() }} >About Page</div>
          <a href="/shopall" className="hamburger-shopall">Shop All</a>
          <div className="hamburger-cart" onClick={() => { HamburgerCart() }}>Cart ({cartContext?.cartCount})</div>

        </div>
        {/* Hamburger End */}

        {/* Nav Links */}
        <div className='links-container'>
          {!authState.isAuthenticated ? 
          <Link className="nav-login" to='/login'>LOGIN</Link>
        :
        <a style={{cursor: 'pointer'}} onClick={handleLogout}>LOGOUT</a>
        }
          
          <Link to={'/shopall'} className="shopall">SHOP ALL</Link>
          <div id="about" className='about' onClick={() => { aboutPage() }}>ABOUT</div>
          <div className='cart' onClick={() => { Cart() }}>CART ({cartContext?.cartCount})</div>

        </div>
      </div>
      <div className='divider'></div>



      {/* DESKTOP CART */}
      <div className="cart-parent">
        <div className="cart-left-overlay" id="cart-left-overlay-id" onClick={() => { Cart() }}>CART {cartContext?.cartCount} </div>
        <div id="cartId" className="cart-container" >
          <div className="cart-button-container">
            <button id="cart-button" className="cart-exit" onClick={() => { cartExit() }}>X</button>
          </div>


          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/* CART MAP START */}

          {cartContext?.localCartItems.map((e, index) => (

            <div key={index} id="cart-product-info-id" className="cart-product-info-container">
              <div>
                <img id="testttt" src={cartContext?.localCartItems[index][2]} className="cart-product-image" />

                {/* Item Increment */}
                <div className="cart-product-increment">
                  <div id="cart-increment-remove" onClick={() => {
                    const newQuantity = cartContext?.localCartItems[index][4] - 1;
                    cartContext?.setLocalCartItems(prevCartItems => {
                      const newCartItems = [...prevCartItems];
                      newCartItems[index][4] = newQuantity;
                      if(newQuantity === 0) {
                        cartRemove(index)
                      }
                      
                      return newCartItems;
                    })}}>{cartContext?.localCartItems[index][4] < 2 ? <img src={can} width={'25px'} height={'25px'} /> : "-"}</div>
                  <div id="cart-increment">{cartContext?.localCartItems[index][4]}</div>
                  <div id="cart-increment-remove" onClick={() => {
                    const newQuantity = cartContext?.localCartItems[index][4] + 1;
                    cartContext?.setLocalCartItems(prevCartItems => {
                      const newCartItems = [...prevCartItems];
                      newCartItems[index][4] = newQuantity;
                      return newCartItems;
                    });
                  }}>+</div>
                </div>
                {/* Item Increment End */}

              </div>
              <div className="cart-product-info-increment-wrapper">
                <div className="cart-product-info">

                  {/* Product Name */}
                  <h6>{cartContext?.localCartItems[index][1]}</h6>

                  {/* Product Size */}
                  <h5>({cartContext?.localCartItems[index][3]})</h5>

                  {/* Product Price */}
                  <h6>{`$${cartContext?.localCartItems[index][5]}`}</h6>

                  {/* Product In Stock */}
                  {/* {cartContext?.localCartItems[index].active ? <h5>In Stock</h5> : <h5>Out of Stock</h5> } */}
                  {/* Remove Button */}
                  <button className="cart-product-remove-button" id="cart-product-remove" onClick={() => { cartRemove(index) }}>REMOVE</button>
                </div>
                {/* <div className="cart-product-increment-laptop">
                  <button id="cart-increment-remove" onClick={() => { cartContext?.setCartCount(cartContext?.cartCount - 1) }}>-</button>
                  <div id="cart-increment">{cartContext?.localCartItems[index][4]}</div>
                  <button id="cart-increment-add" onClick={() => { cartContext?.setCartCount(cartContext?.cartCount + 1) }}>+</button>
                </div> */}
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
            <div className="cart-value">{`$${cartContext?.cartSubTotal}`}</div>
          </div>
          <div id="cart-promo-continue-id" className="cart-promo-continue-container">
            <div className="cart-promo-title">Add Promo Code</div>
            <input className="cart-promo-input" placeholder="Enter your code"></input>
            <Link className="cart-continue" onClick={() => { Cart() }} to={'/checkout'}>Continue to Checkout</Link>
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