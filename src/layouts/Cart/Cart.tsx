import React, { useState, useEffect } from 'react';
import can from '../../assets/can.png'
import '../Cart/cart.css'

const Cart = () => {

    const [cart, setCart] = useState(false)
    const [cartCount, setCartCount] = useState(3)
      const [hamburger, setHamburger] = useState(false)

    useEffect(() => {
  

    const cartRemoveCounter = document.getElementById('cart-increment-remove')
    const cartProductInfo = document.getElementById('cart-product-info-id')
    const cartSubtotal = document.getElementById('cart-subtotal-id')
    const cartPromo = document.getElementById('cart-promo-continue-id')
    const cartPayChoice = document.getElementById('cart-pay-choice-id')
    const cartMaster = document.getElementById('cartId')
  
    if(cartCount === 1) {
      cartRemoveCounter.style.padding ='0px'
    } 
    else {
      cartRemoveCounter.style.marginTop ='-2px'
      cartRemoveCounter.style.padding =''
    }
  
    if(cartCount === 0) {
      cartProductInfo.style.display ='none'
      cartSubtotal.style.display ='none'
      cartPromo.style.display ='none'
      cartPayChoice.style.display ='none'
      const empty = document.createElement('h1')
      empty.style.color = 'white'
      empty.style.fontFamily = 'JetBrains Mono'
      empty.style.textAlign = 'center'
      empty.innerHTML = 'Your Cart is Empty!'
      cartMaster.appendChild(empty)
    }
  },[cartCount])

  const cartRemove = () => {
    const remove = document.getElementById('cart-product-remove')
    const cartProductInfo = document.getElementById('cart-product-info-id')
    const cartSubtotal = document.getElementById('cart-subtotal-id')
    const cartPromo = document.getElementById('cart-promo-continue-id')
    const cartPayChoice = document.getElementById('cart-pay-choice-id')
    const cart = document.getElementById('cartId')
  
    if(remove) {
      const empty = document.createElement('h1')
      setCartCount(0)
      cartProductInfo.style.display ='none'
      cartSubtotal.style.display ='none'
      cartPromo.style.display ='none'
      cartPayChoice.style.display ='none'
      empty.style.color = 'white'
      empty.style.fontFamily = 'JetBrains Mono'
      empty.style.textAlign = 'center'
      cart.appendChild(empty)
    }
    
  }
   const Cart = () => {
    const cartId = document.getElementById('cartId')
    const cartButton = document.getElementById('cart-button')
    const cartOverlay = document.getElementById('cart-left-overlay-id')
    const html = document.getElementById('algo__html'); 
    
    if(cart) {
      setCart(false) 
      cartId.classList.toggle('open')
      cartOverlay.classList.toggle('open')
      console.log(cart)
      html.classList.remove('stop-scrolling')
    } else {
      setCart(true) 
      cartId.classList.toggle('open')
      cartOverlay.classList.toggle('open')
      console.log(cart)
      // html.classList.add('stop-scrolling')
    }
  }

    const cartExit = () => {
      const cartId = document.getElementById('cartId')
      const cartOverlay = document.getElementById('cart-left-overlay-id')
      const html = document.getElementById('algo__html');
      setCart(false)
      setHamburger(false)
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

  const [cartItems, setCartItems] = useState([]);


  const addItemToCart = (item) => {
    setCartItems([...cartItems, item]);
  };


  const removeItemFromCart = (item) => {
    const newCartItems = cartItems.filter((cartItem) => cartItem.id !== item.id);
    setCartItems(newCartItems);
  };


  const getTotalCost = () => {
    const totalCost = cartItems.reduce((accumulator, currentItem) => accumulator + currentItem.price, 0);
    return totalCost;
  };































































  return (
    <div>
          <div className="cart-parent">
  <div className="cart-left-overlay" id="cart-left-overlay-id" onClick={() => {cartExit()}}>CART</div>
  <div id="cartId" className="cart-container" > 
    <div className="cart-button-container">
      <button id="cart-button" className="cart-exit" onClick={() => {cartExit()}}>X</button>
    </div>
    <div id="cart-product-info-id" className="cart-product-info-container">
      <div>
        <img className="cart-product-image"/>
        <div className="cart-product-increment">
          <div id="cart-increment-remove" onClick={() => {setCartCount(cartCount - 1)}}>{cartCount < 2? <img  src={can} width={'25px'} height={'25px'}/> : "-" }</div>
          <div id="cart-increment">{cartCount}</div>
          <button id="cart-increment-add" onClick={() => {setCartCount(cartCount + 1)}}>+</button>
        </div>
      </div>
      <div className="cart-product-info-increment-wrapper">
        <div className="cart-product-info">
          <h3>Follow The Leader</h3>
          <h6>$12</h6>
          <h6>In Stock</h6>
          <button className="cart-product-remove-button" id="cart-product-remove" onClick={() => {cartRemove()}}>REMOVE</button>
        </div>
        <div className="cart-product-increment-laptop">
          <button id="cart-increment-remove" onClick={() => {setCartCount(cartCount - 1)}}>-</button>
          <div id="cart-increment">{cartCount}</div>
          <button id="cart-increment-add" onClick={() => {setCartCount(cartCount + 1)}}>+</button>
        </div>
      </div>
    </div>
    <div id="cart-subtotal-id" className="cart-subtotal-container">
      <div className="cart-subtotal">Subtotal</div>
      <div className="cart-value">{`$${cartCount * 12}`}</div>
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



















      {/* <h2>Cart</h2>
      <ul>
        {cartItems.map((cartItem) => (
          <li key={cartItem.id}>
            {cartItem.name} - {cartItem.price}
            <button onClick={() => removeItemFromCart(cartItem)}>Remove</button>
          </li>
        ))}
      </ul>
      <p>Total cost: {getTotalCost()}</p> */}
    </div>
  );
};

export default Cart;