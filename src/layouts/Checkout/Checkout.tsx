import React, { useContext, useEffect, useState } from 'react'
import './checkout.css'
import { CartContext } from '../../Contexts/CartContext'
import can from '../../assets/can.png'
import { stringify } from 'querystring'
// import Checkout from '../../models/CheckoutModel'

const Checkout = () => {
  const cartContext = useContext(CartContext)
  const [randomNumber1, setRandomNumber1] = useState(Number)
  const [randomNumber2, setRandomNumber2] = useState(Number)
  const [randomNumber3, setRandomNumber3] = useState(Number)
  const [finalOrderNumber, setFinalOrderNumber] = useState(String)
  let total = cartContext?.cartSubTotal


  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    shippingStreet: '',
    shippingCity: '',
    shippingState: '',
    shippingCountry: '',
    shippingZipCode: '',
    billingCheckBox: false,
    billingStreet: '',
    billingCity: '',
    billingState: '',
    billingCountry: '',
    billingZipCode: '',
    fullNameOnCard: '',
    cardNumber: '',
    securityCode: '',
    expirationMonth: '',
    expirationYear: ''
  });

  // Checkout Interface Defintions
  interface Checkout {
    orderTrackingNumber: string;
    totalPrice: number;
    totalQuantity: number;
    // dateCreated: Date;
}

// Random number Generator
useEffect(() => {
  let randomNumber1: number = 0;
for (let i = 0; i < 200; i++) {
    randomNumber1 += Math.floor(Math.random() * 123);
}
setRandomNumber1(randomNumber1)
console.log(randomNumber1);

let randomNumber2: number = 0;
for (let i = 0; i < 200; i++) {
    randomNumber2 += Math.floor(Math.random() * 456);
}
setRandomNumber2(randomNumber2)
console.log(randomNumber2);

let randomNumber3: number = 0;
for (let i = 0; i < 200; i++) {
    randomNumber3 += Math.floor(Math.random() * 789);
}
setRandomNumber3(randomNumber3)
console.log(randomNumber3);
const finalOrderNum = (`${randomNumber1}${randomNumber2}${randomNumber3}`)

// const parseFinalOrderNumber = parseInt(finalOrderNumber, 10)
setFinalOrderNumber(finalOrderNum)
}, [])



// Checkout Interface Declarations

  const newCheckout: Checkout = {
    

    orderTrackingNumber: finalOrderNumber,
    totalPrice: total,
    totalQuantity: cartContext?.cartCount
  }

// Submit All POSTS
  const handleSubmit = (event) => {
    
    event.preventDefault();

    // make POST request to server
    fetch('http://localhost:8080/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCheckout)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
  };
  

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Local Cart Remove Button
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
              <input className='checkout-input-form-input' type="text" name="firstName" value={formData.firstName} onChange={handleChange}/>
            </label>
            <label className='checkout-input-label'>
              Last Name:
              <input className='checkout-input-form-input' type="text" name="lastName" value={formData.lastName} onChange={handleChange}/>
            </label>
            <label className='checkout-input-label'>
              Email:
              <input className='checkout-input-form-input' type="email" name="email" value={formData.email} onChange={handleChange}/>
            </label>
          </form>
          <h3>Shipping Information:</h3>
          <form className='checkout-input-form'>
            <label className='checkout-input-label'>
              Street:
              <input className='checkout-input-form-input' type="text" name="shippingStreet" value={formData.shippingStreet} onChange={handleChange}/>
            </label>
            <label className='checkout-input-label'>
              City:
              <input className='checkout-input-form-input' type="text" name="shippingCity" value={formData.shippingCity} onChange={handleChange}/>
            </label>
            <label className='checkout-input-label'>
              State:
              <input className='checkout-input-form-input' type="text" name="shippingState" value={formData.shippingState} onChange={handleChange}/>
            </label>
            <label className='checkout-input-label'>
              Country:
              <input className='checkout-input-form-input' type="text" name="shippingCountry" value={formData.shippingCountry} onChange={handleChange}/>
            </label>
            <label className='checkout-input-label'>
              Zip Code:
              <input className='checkout-input-form-input' type="text" name="shippingZipCode" value={formData.shippingZipCode} onChange={handleChange}/>
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
              <input className='checkout-input-form-input' type="text" name="billingStreet" value={formData.billingStreet} onChange={handleChange}/>
            </label>
            <label className='checkout-input-label'>
              City:
              <input className='checkout-input-form-input' type="text" name="billingCity" value={formData.billingCity} onChange={handleChange}/>
            </label>
            <label className='checkout-input-label'>
              State:
              <input className='checkout-input-form-input' type="text" name="billingState" value={formData.billingState} onChange={handleChange}/>
            </label>
            <label className='checkout-input-label'>
              Country:
              <input className='checkout-input-form-input' type="text" name="billingCountry" value={formData.billingCountry} onChange={handleChange}/>
            </label>
            <label className='checkout-input-label'>
              Zip Code:
              <input className='checkout-input-form-input' type="text" name="billingZipCode" value={formData.billingZipCode} onChange={handleChange}/>
            </label>
          </form>
          <h3>Credit Card Information:</h3>
          <form className='checkout-input-form'>
            <label className='checkout-input-label'>
              Full name on card:
              <input className='checkout-input-form-input' type="text" name="fullNameOnCard" value={formData.fullNameOnCard} onChange={handleChange}/>
            </label>
            <label className='checkout-input-label'>
              Card Number:
              <input className='checkout-input-form-input' type="number" name="cardNumber" value={formData.cardNumber} onChange={handleChange}/>
            </label>
            <label className='checkout-input-label'>
              Security Code:
              <input className='checkout-input-form-input' type="number" name="securityCode" value={formData.securityCode} onChange={handleChange}/>
            </label>
            <label className='checkout-input-label'>
              Expiration Month:
              <select className='credit-month-selection' name="month" value={formData.expirationMonth} onChange={handleChange}>
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
              <input className='checkout-input-form-input' type="number" name="expirationYear" value={formData.expirationYear} onChange={handleChange}/>
            </label>
          </form>
          <button className='checkout-submit-button' onClick={(handleSubmit)}>Place Order</button>
        </div>
    </div>
  )
}

export default Checkout