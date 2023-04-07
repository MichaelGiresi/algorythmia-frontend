import React, { useEffect, useState, useContext, useRef } from 'react'
import './productpage.css'
import ProductModel from '../../models/ProductModel';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Contexts/CartContext';
import { stringify } from 'querystring';
import OrderModel from '../../models/OrderModel';




export const ProductPage = (props) => {


    const cartContext = useContext(CartContext)
    const [product, setProduct] = useState<ProductModel>()
    const [cartState, setCartState] = useState([])
    const [orders, setOrders] = useState<OrderModel>()
    const [products, setProducts] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingProducts, setIsLoadingProducts] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [productSize, setProductSize] = useState(0);
    
    const productId = (window.location.pathname).split('/')[2];
    const restOfProducts = []
    let itemQuantity = 1

    // Fetch Product
    useEffect(() => {
  
      const fetchProduct = async () => {
        const baseUrl = `http://localhost:8080/api/products/${productId}`
        const response = await fetch(baseUrl);

        if(!response.ok) {
          throw new Error('Something went wrong!')
        }

        const responseJson = await response.json();
        const loadedProduct: ProductModel = {
            id: responseJson.id,
            productCategory: responseJson.productCategory,
            sku: responseJson.sku,
            name: responseJson.name,
            sizeId: responseJson.sizeId,
            sizeSmall: responseJson.sizeSmall,
            sizeMedium: responseJson.sizeMedium,
            sizeLarge: responseJson.sizeLarge,
            sizeExtraLarge: responseJson.sizeExtraLarge,
            sizeExtraExtraLarge: responseJson.sizeExtraExtraLarge,
            description: responseJson.description,
            unitPrice: responseJson.unitPrice,
            imageUrl: responseJson.imageUrl,
            active: responseJson.active,
            // unitsInStock: responseJson.unitsInStock,
            dateCreated: responseJson.dateCreated,
            lastUpdated: responseJson.lastUpdated
        };
        setProduct(loadedProduct)
        setIsLoading(false)
      };
      fetchProduct().catch((error) => {
        setIsLoading(false);
        setHttpError(error.message)
      })
    }, [])  

    // Fetch Products
    useEffect(() => {

        const fetchProducts = async () => {
          const baseUrl = 'http://localhost:8080/api/products'
          const url = `${baseUrl}?page=0&size=20`;
          const response = await fetch(url);

          

          
          if(!response.ok) {
              throw new Error('Something went wrong!')
            }
            // if( )
            
          const responseJson = await response.json();
          const responseData = responseJson._embedded.products
          setProducts(responseData)
          setIsLoadingProducts(false)
        //   console.log(products[0].id)
        };
        fetchProducts().catch((error) => {
          setIsLoadingProducts(false);
          setHttpError(error.message)
        })
    
    }, [])  

    if(!isLoadingProducts) {
        const num = parseInt(productId)
        for(let i = 0; i < products.length; i++) {
            if(products[i].id !== num) {
                restOfProducts.push(products[i])
                
            }
            
        }
    }
    useEffect(() => {
        console.log('------- CART STATUS ------')
        console.log(cartContext?.localCartItems)
        console.log('--------------------------')

    }, [cartContext?.localCartItems])
    
    const handleProductChange = (e: any) => {
        // setProductSize(0)
        setProductSize(e.target.value)
        // console.log(productSize)
        const btn = document.getElementById('product-add-to-cart-button')
        btn.innerText = 'Add To Cart'
    }



        const addToCart = (product, productSize) => {
            

            // Checks to see if size is selected

            if(productSize < 1) {
                const btn = document.getElementById('product-add-to-cart-button')
                btn.innerText = 'Please Select A Size'

            } else {
                
                // Checks to see if localCartItems array is empty

                if(cartContext?.localCartItems.length === 0){
                    
                    cartContext?.setLocalCartItems([[product.id, product.name, product.imageUrl, productSize, itemQuantity, product.unitPrice, product.sku, product.description, product.active]])
                    
                } else {

                    // Loops through existing elements in localCartItems and checks if the id's and product sizes are already in the localCartItems array.

                    let a = false
                    for(let i = 0; i < cartContext?.localCartItems.length; i++) {

                        if(cartContext?.localCartItems[i][0] === product.id && cartContext?.localCartItems[i][3] === productSize) {

                            a = true
                            const btn = document.getElementById('product-add-to-cart-button')
                            btn.innerText = 'Already Added to Cart'
                            break
                        }
                    }

                    if(a === false) {
                        
                        cartContext?.setLocalCartItems([...cartContext?.localCartItems, [product.id, product.name, product.imageUrl, productSize, itemQuantity, product.unitPrice, product.sku, product.description, product.active]])
                        const btn = document.getElementById('product-add-to-cart-button')
                        btn.innerText = 'Added to Cart!'
                        console.log(cartContext?.localCartItems)
                         
                    }
                }
            }
        }
            
            
            
            return (
                <div className='product'>
        <div className='product-hero-container'>
            <div className='product-image-container'>
                <img style={{borderRadius: '12px', width: '100%'}} src={product?.imageUrl}/>
            </div>
            <div className='product-hero-info'>
                {/* <h4 id='product-hero-info-category'>SHOP ALL / SHIRTS</h4> */}
                <div id='product-name'>{product?.name}</div>
                {/* <div className='product-hero-productinfo-container'> */}
                    <div className='product-hero-price-container'>
                        <div id='product-price'>PRICE</div>
                        <div id='product-unit-price'>${product?.unitPrice}</div>
                    </div>
                    <div className='product-hero-size-container'>
                        <div id='product-size'>SELECT SIZE:</div>
                        <select value={productSize} onChange={handleProductChange}  className='product-size-selector-container'>
                             <option value={0} id='product-size-select'>Select</option>
                            <option value={'Size: S'} id='product-size-small'>Small</option>
                            <option value={'Size: M'} id='product-size-medium'>Medium</option>
                            <option value={'Size: L'} id='product-size-large'>Large</option>
                            <option value={'Size: XL'} id='product-size-extralarge'>Extra Large</option>
                            <option value={'Size: XXL'} id='product-size-extraextralarge'>Extra Extra Large</option>
                        </select>
                    </div>
                    <div className='product-hero-info-container'>
                        <div id='product-info'>INFO</div>
                        <div id='product-info-details'>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate.</div>
                    </div>
                    <div className='product-hero-button-container'>
                        <button onClick={() => {addToCart(product, productSize)}} id='product-add-to-cart-button'>ADD TO CART</button>
                        <button onClick={() => {cartContext?.setLocalCartItems([])}}>Temporary wipe cart button</button>
                    </div>
                {/* </div> */}
            </div>
        </div>
        <div className='product-otherproducts-container'>
            <div className='products-otherproducts-title'>More Products</div>
            <div className='product-otherproducts-info'>
                <p>At vers et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.</p>
            </div>
            <div className='product-otherproducts-imagecontainer'>
                <div className='product-otherproducts-slide1-container'>
                
                  {!isLoadingProducts ?  <a href={`/productpage/${restOfProducts[0].id}`}><img id='product-otherproducts-slide1-image' src={restOfProducts[0].imageUrl}/></a>  : <div>Loading</div> }
                    <div className='product-otherproduct1-info'>
                        <h3>{restOfProducts[0]?.name}</h3>
                        <h3>${restOfProducts[0]?.unitPrice}</h3>
                    </div>
                </div>
                <div className='product-otherproducts-slide1-container'>
                {!isLoadingProducts ?   <a href={`/productpage/${restOfProducts[1].id}`}><img id='product-otherproducts-slide1-image' src={restOfProducts[1].imageUrl}/></a> : <div>Loading</div> }
                    <div className='product-otherproduct1-info'>
                        <h3>{restOfProducts[1]?.name}</h3>
                        <h3>${restOfProducts[1]?.unitPrice}</h3>
                    </div> 
                </div>
                <div className='product-otherproducts-slide1-container'>
                {!isLoadingProducts ?   <a href={`/productpage/${restOfProducts[2].id}`}><img id='product-otherproducts-slide1-image' src={restOfProducts[2].imageUrl}/></a> : <div>Loading</div> }
                    <div className='product-otherproduct1-info'>
                        <h3>{restOfProducts[2]?.name}</h3>
                        <h3>${restOfProducts[2]?.unitPrice}</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductPage