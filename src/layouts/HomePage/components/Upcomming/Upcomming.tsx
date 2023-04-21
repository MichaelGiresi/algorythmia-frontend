import React, { useEffect } from 'react'
import { useState } from 'react'
import Hero from '../Hero/Hero'
import './upcomming.css'
import upcomming1 from '../../assets/FollowTheLeaderPoster.jpeg'
import upcomming2 from '../../assets/FollowTheLeaderPoster02.jpeg'
import upcomming3 from '../../assets/FollowTheLeaderPoster03.jpeg'
import { Link } from 'react-router-dom'
const Upcomming = (props) => {

  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [images, setImages] = useState([]);
  const scrollToTop = () => {
    window.scrollTo(0, 0)
}

  useEffect(() => {

    const fetchProducts = async () => {
      const baseUrl = 'https://18.217.214.80:8080/api/products'
      const url = `${baseUrl}?page=0&size=20`;
      // const url = `${baseUrl}`

      const response = await fetch(url);
      // console.log(response)

      if(!response.ok) {
        throw new Error('Something went wrong!')
      }

      const responseJson = await response.json();
      const responseData = responseJson._embedded.products
      // console.log(responseData)
      // console.log(responseData[5].imageUrl)
      setProducts(responseData)
      setIsLoading(false)
    };
    fetchProducts().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message)

    })
    
  }, [])  

  useEffect(() => {
      
        const imageUrls = [];
        for(let i = 0; i < products.length; i++) {
        
            if (products[i].size === 3){
                // products.size.push(imageUrls)
                // console.log(products[i].imageUrl)
                imageUrls.push(products[i].imageUrl)
              }
              // console.log(products[i].size)
          
            }
            setImages(imageUrls)
            // console.log(images)
          
        }, [products])


        // { isLoading ? <div></div> : <Link to={`productpage/${products[0].id}`} ><img className='container1-image' src={products[0].imageUrl}/></Link>}
  
  return (
    <div className='upcomming'>
      <h1>UPCOMMING</h1>
      <div className='up-containers'>
      { !isLoading ? <Link onClick={scrollToTop} to={`productpage/${products[3].id}`}><img className='up-container1' src={products[3].imageUrl}/></Link> : <div></div>}
      { !isLoading ? <Link onClick={scrollToTop} to={`productpage/${products[2].id}`}><img className='up-container2' src={products[2].imageUrl}/></Link> : <div></div>}
      { !isLoading ? <Link className='up-container3' onClick={scrollToTop} to={`productpage/${products[4].id}`}><img className='up-container3' src={products[4].imageUrl}/></Link> : <div></div>}
      </div>
    </div>
  )
}

export default Upcomming