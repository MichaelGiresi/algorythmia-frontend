// import Hero from "./layouts/HomePage/components/Hero/Hero";
// import Upcomming from "./layouts/HomePage/components/Upcomming/Upcomming";
import HomeOutput from "./layouts/HomePage/HomeOutput";
import { BrowserRouter as Router, Route, Link, Switch, Redirect,  } from 'react-router-dom'
import ShopAll from "./layouts/ShopAllPage/ShopAll";
import Error from "./Error"
// import Product from "./layouts/ProductPage/ProductPage";
import { useState, useEffect, useRef } from 'react'
import sheepimg1 from './assets/FollowTheLeaderPoster.jpeg'
import can from './assets/can.png'
import './layouts/Cart/cart.css'
import './layouts/HomePage/components/Nav/nav.css'
import './index.css'
import ProductPage from "./layouts/ProductPage/ProductPage";
import Cart from "./layouts/Cart/Cart";
import Nav from "./layouts/HomePage/components/Nav/Nav";
import Footer from "./layouts/HomePage/components/Footer/Footer";
import Hero from "./layouts/HomePage/components/Hero/Hero";
import Upcomming from "./layouts/HomePage/components/Upcomming/Upcomming";
import { CartContext } from "./Contexts/CartContext";



function App() {
  const [localCartItems, setLocalCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem('localCartItems')
    return storedCartItems ? JSON.parse(storedCartItems) : []
  })
  const [hamburger, setHamburger] = useState(false)
  const [about, setAbout] = useState(false)

  const [cartCount, setCartCount] = useState(() => {
  const storedCartCount = localStorage.getItem('cartCount');
  return storedCartCount ? JSON.parse(storedCartCount) : []
  })

  const [cart, setCart] = useState(false)
  
  useEffect(() => {
    localStorage.setItem('localCartItems', JSON.stringify(localCartItems))
  },[localCartItems])
  
  return (
    <div>

      <Router>
      <CartContext.Provider value={{
                            hamburger, setHamburger,
                            cartCount, setCartCount,
                            about, setAbout,
                            cart, setCart,
                            localCartItems, setLocalCartItems}}>
        <Nav />
        <Switch>
          <Route path="/shopall">
            <ShopAll />
          </Route>
          <Route path="/productpage/:productId">
            <ProductPage />
          </Route>
          <Route path="/">
            <Hero />
            <Upcomming />
          </Route>
        </Switch>
        <Footer />
      </CartContext.Provider>
      </Router>
    </div>
  );
}

export default App;
