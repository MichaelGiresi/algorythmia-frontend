import React, { useContext, useEffect, useState } from 'react'
import './checkout.css'
import { CartContext } from '../../Contexts/CartContext'
import can from '../../assets/can.png'
import { stringify } from 'querystring'
import { toast } from 'react-toastify'
// import Checkout from '../../models/CheckoutModel'

const Checkout = () => {
  const cartContext = useContext(CartContext)
  const [randomNumber1, setRandomNumber1] = useState(Number)
  const [randomNumber2, setRandomNumber2] = useState(Number)
  const [randomNumber3, setRandomNumber3] = useState(Number)
  const [finalOrderNumber, setFinalOrderNumber] = useState(String)
  const [customers, setCustomers] = useState([])
  const [shippingAddresses, setShippingAddresses] = useState([])
  let total = cartContext?.cartSubTotal
  let activeCustomer = []

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
}

  interface Customer {
    firstName: string,
    lastName: string,
    email: string
  }

  interface ShippingAddress {
    customer: {
      id: Number
    },
    city: String,
    country: String,
    state: String,
    street: String,
    zipCode: String

  }

// Random number Generator
useEffect(() => {
  let randomNumber1: number = 0;
for (let i = 0; i < 200; i++) {
    randomNumber1 += Math.floor(Math.random() * 123);
}
setRandomNumber1(randomNumber1)
// console.log(randomNumber1);

let randomNumber2: number = 0;
for (let i = 0; i < 200; i++) {
    randomNumber2 += Math.floor(Math.random() * 456);
}
setRandomNumber2(randomNumber2)
// console.log(randomNumber2);

let randomNumber3: number = 0;
for (let i = 0; i < 200; i++) {
    randomNumber3 += Math.floor(Math.random() * 789);
}
setRandomNumber3(randomNumber3)
// console.log(randomNumber3);
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

  const newCustomer: Customer = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email
  }


// Submit form
  const handleSubmit = async (event) => {
    event.preventDefault();
    let activeCustomer = []
    let activeShippingAddressId = 0

    try {
    // Check to see if customer already exists in the database, Get array of customers
    const urlCustomers = 'http://localhost:8080/api/customers'
    const optionsCustomers = {
      method: "GET", 
      headers: 
        {"Content-Type": "application/json"},
      };
      const response = await fetch(urlCustomers, optionsCustomers);
      const data = await response.json();
      const customerArray = data._embedded.customers;
      setCustomers(customerArray)

      // If form input is empty
      if(formData.firstName == '' || formData.lastName === '' || formData.email === '') {
        toast.error("Please Complete All Fields")
      } else {

        let a = false

      // Looping over the length of customers array
      for(let i = 0; i < customerArray.length; i++) {

      // If the form data does not match any existing customers, post new customer
       if(customerArray[i].firstName === formData.firstName && customerArray[i].lastName === formData.lastName && customerArray[i].email === formData.email) {
        a = true

        activeCustomer = [customerArray[i].id, customerArray[i].firstName, customerArray[i].lastName, customerArray[i].email]
        } 
      }
        if(a) {
          console.log("customer already exist")
          toast.error("The Customer already exists")

          
        } else {
          try{
            fetch('http://localhost:8080/api/customers', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(newCustomer)
            }) 
            toast.success("New Customer Added")
            setCustomers([...customerArray, newCustomer])
            
          }
          catch{
            toast.error("The Customer wasn't added")
          }

          try {
            const urlCustomers = 'http://localhost:8080/api/customers'
            const optionsCustomers = {
            method: "GET", 
            headers: 
              {"Content-Type": "application/json"},
            };
            const response = await fetch(urlCustomers, optionsCustomers);
            const data = await response.json();
            const customerArray = data._embedded.customers;
            for(let i = 0; i < customerArray.length; i++) {
              if(customerArray[i].firstName === formData.firstName && customerArray[i].lastName === formData.lastName && customerArray[i].email === formData.email) {

                activeCustomer = [customerArray[i].id, customerArray[i].firstName, customerArray[i].lastName, customerArray[i].email]
                } 
            }
          }
          catch (error){
            console.log(`There was an error ${error}`)
          }
        } 
    }
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    // End of Customer GET and POST

  

    // Shipping GET and POST
    try {
      const shippingAddressArrayUrl = 'http://localhost:8080/api/shippingAddresses'
      const shippingAddressArrayOptions = {
        method: "GET",
        headers: {"Content-Type": "application/json"}
      }
      const response = await fetch(shippingAddressArrayUrl, shippingAddressArrayOptions)
      const data = await response.json();
      const shippingAddressArray = data._embedded.shippingAddresses
      console.log(shippingAddressArray)
      setShippingAddresses(shippingAddressArray)
      

      // Check if any shipping inputs are empty
      if (formData.shippingStreet ==='' || formData.shippingCity === '' || formData.shippingState === '' || formData.shippingCountry === '' || formData.shippingZipCode === '') {
        toast.error("Please enter all shipping address information")
      } else {
        console.log(`The active customer id is ${activeCustomer[0]}`)
        // check if shipping information entered in the inputs already exists on the database
        let a = false
        for (let i = 0; i < shippingAddressArray.length; i++) {

          if(shippingAddressArray[i].city == formData.shippingCity && 
            shippingAddressArray[i].country == formData.shippingCountry && 
            shippingAddressArray[i].state == formData.shippingState &&
            shippingAddressArray[i].street == formData.shippingStreet &&
            shippingAddressArray[i].zipCode == formData.shippingZipCode &&
            shippingAddressArray[i].id == activeCustomer[0]) {
              a = true
            }

        }

        // console.log(activeCustomer)

        // if the shipping address does not exist in the shipping_address table
        if(!a) {
          
          const newShippingAddress: ShippingAddress = {
    
            city: formData.shippingCity,
            country: formData.shippingCountry,
            state: formData.shippingState,
            street: formData.shippingStreet,
            zipCode: formData.shippingZipCode,
            customer: {id: activeCustomer[0]}
        
          }

          // POST to shipping_address table 
          try{
            fetch('http://localhost:8080/api/shippingAddress/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(newShippingAddress)
            }) 
            .then(response => {
              console.log("Response Status: ", response.status)
              console.log("Response Status Text: ", response.statusText)
            })            
          }
          catch (error){
            toast.error("The Shipping Address wasn't added")
            console.log(error)
          }
        } else {
          console.log('The Shipping address and customer id already exist')
        }
      }
    }
    catch (error) {
      console.error("Error fetching data", error)
    }

    // GET request of shipping table to get active shipping id
    try {
      const urlShippingAddresses = 'http://localhost:8080/api/shippingAddress/'
      const optionsShippingAddresses = {
      method: "GET", 
      headers: 
        {"Content-Type": "application/json"},
      };
      const response = await fetch(urlShippingAddresses, optionsShippingAddresses);
      const data = await response.json();
      console.log(data)
      const shippingAddressesQuery = data
      for(let i = 0; i < shippingAddressesQuery.length; i++) {
        if(shippingAddressesQuery[i].city === formData.shippingCity && 
          shippingAddressesQuery[i].country === formData.shippingCountry && 
          shippingAddressesQuery[i].state === formData.shippingState && 
          shippingAddressesQuery[i].street === formData.shippingStreet &&
          shippingAddressesQuery[i].zipCode === formData.shippingZipCode) {

          activeShippingAddressId = shippingAddressesQuery[i].id
          console.log(`This is the shipping id = ${activeShippingAddressId}`)
          } 
      }
    }
    catch (error){
      console.log(`There was an error ${error}`)
    }


  {/*
    Finally, I am at the point of creating a proper order post request.

    The order post request requires several pieces of information, and also contains two posts.

    The first post is to the orders table. This post will contain the following information:

      An order tracking number, total price, total quanitity, customer id, shipping address id and the status.

    The second post request will be to the order_items table. This post will contain the following information:

    The quantity of a specific item, the unit price of a specific item, order id, product id, size id.  

    I will either have to make many post requests, however many items there are in the total quanitity, or figure out how to make one post request, and post several enteries in one shot.

  */}




    // make POST request to server
    // fetch('http://localhost:8080/api/orders', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(newCheckout)
    // })
    // .then(response => response.json())
    // .then(data => console.log(data))
    // .catch(error => console.error(error));
  };
  

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
  
    if (type === 'checkbox' && name === 'billingCheckBox' && checked) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        billingStreet: prevFormData.shippingStreet,
        billingCity: prevFormData.shippingCity,
        billingState: prevFormData.shippingState,
        billingCountry: prevFormData.shippingCountry,
        billingZipCode: prevFormData.shippingZipCode,
        [name]: checked,
      }));
    } else if (type === 'checkbox' && name === 'billingCheckBox' && !checked) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        billingStreet: '',
        billingCity: '',
        billingState: '',
        billingCountry: '',
        billingZipCode: '',
        [name]: checked,
      }));
    } else if (name.startsWith('shipping')) {
      const updatedFormData = {
        ...formData,
        [name]: value,
      };
  
      if (formData.billingCheckBox) {
        const billingAddressFields = name.replace('shipping', 'billing');
        updatedFormData[billingAddressFields] = value;
      }
  
      setFormData(updatedFormData);
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
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
              <input className='checkout-input-form-input-checkbox' onChange={handleChange} type="checkbox" name="billingCheckBox"/>
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