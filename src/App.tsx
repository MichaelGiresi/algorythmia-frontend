import HomeOutput from "./layouts/HomePage/HomeOutput";
import { BrowserRouter as Router, Route, Link, Switch, Redirect, useHistory } from 'react-router-dom'
import ShopAll from "./layouts/ShopAllPage/ShopAll";
import Error from "./Error"
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
import Checkout from "./layouts/Checkout/Checkout";
import { oktaConfig } from "./lib/oktaConfig";
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js'
import { Security, LoginCallback, SecureRoute, useOktaAuth } from '@okta/okta-react'
import LoginWidget from "./Auth/LoginWidget";
import { ManageProductsPage } from "./layouts/ManageProductsPage/ManageProductsPage";
import { ToastContainer } from "react-toastify";
import '../src/toastStyles.css'

const oktaAuth = new OktaAuth(oktaConfig)


function App() {

  const customAuthHandler = () => {
    history.push('/login')
  }

  const history = useHistory();

  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin))
  }


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

  const [cartSubTotal, setCartSubTotal] = useState(() => {
    const cartSubTotal= localStorage.getItem('cartSubTotal');
    return cartSubTotal ? JSON.parse(cartSubTotal) : []
    })

  const [cart, setCart] = useState(false)
  
  useEffect(() => {
    localStorage.setItem('localCartItems', JSON.stringify(localCartItems))
    // console.log(oktaAuth)
    // console.log(oktaAuth.authStateManager._authState)
  },[localCartItems])
  
  return (
    <div>

        <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={customAuthHandler}> 
      <Router>
      <CartContext.Provider value={{
        hamburger, setHamburger,
        cartCount, setCartCount,
        about, setAbout,
        cart, setCart,
        cartSubTotal, setCartSubTotal,
        localCartItems, setLocalCartItems}}>
        <Nav />
        <Switch>
          <Route path="/shopall">
            <ShopAll />
          </Route>
          <Route path='/login' render={() => <LoginWidget config={oktaConfig}/>}/>
          <Route path="/productpage/:productId">
            <ProductPage />
          </Route>
          <Route path="/checkout"><Checkout/></Route>
      <SecureRoute path='/admin'><ManageProductsPage/></SecureRoute>
          <Route path="/">
            <Hero />
            <Upcomming />
          </Route>
        </Switch>
        <Footer />
      </CartContext.Provider>
      <Route path='/login/callback' component={LoginCallback} />
      <ToastContainer/>
      </Router>
                              </Security>
    </div>
  );
}

export default App;
