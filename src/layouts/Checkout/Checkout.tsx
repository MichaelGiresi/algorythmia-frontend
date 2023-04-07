import React, { useContext } from 'react'
import './checkout.css'
import { CartContext } from '../../Contexts/CartContext'
import can from '../../assets/can.png'

const Checkout = () => {
  const cartContext = useContext(CartContext)

  const cartRemove = (indexToRemove) => {
    console.log(indexToRemove)

    cartContext?.setCartCount(cartContext?.localCartItems[indexToRemove][4] - cartContext?.cartCount)
    cartContext?.setLocalCartItems(cartContext?.localCartItems.filter((_, index) => index !== indexToRemove));
  }

  return (

    <div className='checkout-container'>
        <div className='checkout-cart-container'>
          <h1 style={{color: "#c3c3c3", textAlign: 'center', marginBottom: '50px', fontFamily: 'JetBrains Mono'}}>Cart Contents:</h1>
        {cartContext?.localCartItems.map((e, index) => (

<div key={index} id="cart-product-info-id" className="checkout-product-info-container">
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

      {/* Remove Button */}
      <button className="cart-product-remove-button" id="cart-product-remove" onClick={() => { cartRemove(index) }}>REMOVE</button>
    </div>

  </div>
</div>

))}
        </div>
        <div className='checkout-input-container'>
          <form className='checkout-input-form'>
            <label className='checkout-input-label'>
              First Name:
              <input className='checkout-input-form-input' type="text" name="firstName"/>
            </label>
            <label className='checkout-input-label'>
              Last Name:
              <input className='checkout-input-form-input' type="text" name="lastName"/>
            </label>
            <label className='checkout-input-label'>
              Email:
              <input className='checkout-input-form-input' type="email" name="email"/>
            </label>
          </form>
          <h3>Shipping Information:</h3>
          <form className='checkout-input-form'>
            <label className='checkout-input-label'>
              Street:
              <input className='checkout-input-form-input' type="text" name="shippingStreet"/>
            </label>
            <label className='checkout-input-label'>
              City:
              <input className='checkout-input-form-input' type="text" name="shippingCity"/>
            </label>
            <label className='checkout-input-label'>
              State:
              <input className='checkout-input-form-input' type="text" name="shippingState"/>
            </label>
            <label className='checkout-input-label'>
              Country:
              <input className='checkout-input-form-input' type="text" name="shippingCountry"/>
            </label>
            <label className='checkout-input-label'>
              Zip Code:
              <input className='checkout-input-form-input' type="text" name="shippingZipCode"/>
            </label>
          </form>
          <h3>Billing Address:</h3>
          <form className='checkout-input-form'>
          <label className='checkout-input-label-checkbox'>
              <input className='checkout-input-form-input-checkbox' type="checkbox" name="billingCheckBox"/>
              Billing Address same as Shipping Address
            </label>
            <label className='checkout-input-label'>
              Street:
              <input className='checkout-input-form-input' type="text" name="billingStreet"/>
            </label>
            <label className='checkout-input-label'>
              City:
              <input className='checkout-input-form-input' type="text" name="billingCity"/>
            </label>
            <label className='checkout-input-label'>
              State:
              <input className='checkout-input-form-input' type="text" name="billingState"/>
            </label>
            <label className='checkout-input-label'>
              Country:
              <input className='checkout-input-form-input' type="text" name="billingCountry"/>
            </label>
            <label className='checkout-input-label'>
              Zip Code:
              <input className='checkout-input-form-input' type="text" name="billingZipCode"/>
            </label>
          </form>
          <h3>Credit Card Information:</h3>
          <form className='checkout-input-form'>
            <label className='checkout-input-label'>
              Full name on card:
              <input className='checkout-input-form-input' type="text" name="firstName"/>
            </label>
            <label className='checkout-input-label'>
              Card Number:
              <input className='checkout-input-form-input' type="number" name="firstName"/>
            </label>
            <label className='checkout-input-label'>
              Security Code:
              <input className='checkout-input-form-input' type="number" name="firstName"/>
            </label>
            <label className='checkout-input-label'>
              Expiration Month:
              <select className='credit-month-selection' name="month" >
                <option value="">Select a month</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
            </label>
            <label className='checkout-input-label'>
              Expiration Year:
              <input className='checkout-input-form-input' type="number" name="firstName"/>
            </label>
          </form>
          <button className='checkout-submit-button'>Place Order</button>
        </div>
    </div>
  )
}

export default Checkout