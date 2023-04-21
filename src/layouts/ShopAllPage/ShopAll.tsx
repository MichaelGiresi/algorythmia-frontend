import React from 'react'
import {useState, useEffect} from 'react'
import graySquare from '../../assets/graySquare.jpg'
import './shopall.css'
import product1 from '../../assets/Brokengrid01.jpeg'
import product2 from '../../assets/FollowTheLeaderPoster.jpeg'
import product3 from '../../assets/FollowTheLeaderPoster02.jpeg'
import product4 from '../../assets/FollowTheLeaderPoster03.jpeg'
import product5 from '../../assets/Wethreeheads01.jpeg'
import product6 from '../../assets/algorythmia01.jpeg'
import { Link } from 'react-router-dom'

const ShopAll = () => {

    const [products, setProducts] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttopError] = useState(null);
  
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
        setHttopError(error.message)
        
      })
  
    }, [])  

    // console.log(products)

  return (
    <div className="sa-hero">
        <div className="sa-headings-container">
            <h1>All Products</h1>
            <h6> YOU MAY HAVE IT</h6>
        </div>
        {!isLoading ? 
        <div className="sa-info-images-container">
            <div className="sa-info-container">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.</div>
            <div className="sa-images-container">
                <div className="sa-images-innercontainer1">
                    <div className="sa-images-innercontainer1-leftslides">
                        <div className="sa-images-innercontainer1-slide1">
                            <div className='sa-imagecontainer-slide1'>
                                {/* {<img style={{borderTopLeftRadius: '12px', borderTopRightRadius: '12px'}} width='100%' height= '100%' src={products[0].imageUrl}/>} */}
                                { !isLoading ? <Link to={`productpage/${products[0].id}`} ><img className='container1-image' src={products[0].imageUrl}/></Link>  : <div></div>}
                                {/* <img  src={product1} /> */}
                            </div>
                            <div className='sa-slide1-info'>
                            <div className='sa-slide1-title'>{products[0].name}</div>
                            <div className='sa-slide1-price'>$30</div>
                            </div>
                        </div>
                        <div className="sa-images-innercontainer1-slide2">
                            <div className='sa-imagecontainer-slide2'>
                            {/* {!isLoading ? <img style={{borderTopLeftRadius: '12px', borderTopRightRadius: '12px'}} width='100%' height= '100%' src={products[1].imageUrl}/> : <img style={{borderTopLeftRadius: '12px', borderTopRightRadius: '12px'}} src={graySquare} width='100%' height='100%'/>} */}
                            { !isLoading ? <Link to={`productpage/${products[1].id}`} ><img className='container1-image' src={products[1].imageUrl}/></Link>  : <div></div>}
                            </div>
                            <div className="sa-slide2-info">
                                <div className="sa-slide2-title">{products[1].name}</div>
                                <div className="sa-slide2-price">$30</div>
                            </div>    
                        </div>
                    </div>
                    <div className="sa-images-innercontainer1-rightslides">
                        <div className="sa-images-innercontainer1-rightslides-slide1">
                            <div className='sa-imagecontainer-images-rightslides-slide1'>
                            {/* {!isLoading ? <img style={{borderTopLeftRadius: '12px', borderTopRightRadius: '12px'}} width='100%' height= '100%' src={products[2].imageUrl}/> : <img style={{borderTopLeftRadius: '12px', borderTopRightRadius: '12px'}} src={graySquare} width='100%' height='100%'/>} */}
                            { !isLoading ? <Link to={`productpage/${products[2].id}`} ><img className='container1-image' src={products[2].imageUrl}/></Link>  : <div></div>}
                            </div>
                            <div className="sa-slide1-rightslides-info">
                                <div className="sa-slide1-rightslides-title">{products[2].name}</div>
                                <div className="sa-slide1-rightslides-price">$30</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sa-images-innercontainer2">
                    <div className="sa-images-innercontainer2-row1">
                        <div className="sa-images-innercontainer2-row1-slide1">
                            <div className='sa-imagecontainer2-row1-slide1-image'>
                            {/* {!isLoading ? <img style={{borderTopLeftRadius: '12px', borderTopRightRadius: '12px'}} width='100%' height= '100%' src={products[3].imageUrl}/> : <img style={{borderTopLeftRadius: '12px', borderTopRightRadius: '12px'}} src={graySquare} width='100%' height='100%'/>} */}
                            { !isLoading ? <Link style={{height: '-webkit-fill-available'}} to={`productpage/${products[3].id}`} ><img style={{borderTopLeftRadius: '12px', borderTopRightRadius: '12px', height: '-webkit-fill-available', marginBottom: '-4px'}} width='100%' src={products[3].imageUrl}/></Link>  : <div></div>}
                            </div>
                            <div className="sa-row1-slide1-info">
                                <div className="sa-row1-slide1-title">{products[3].name}</div>
                                <div className="sa-row1-slide1-price">$30</div>
                            </div>
                        </div>
                        <div className="sa-images-innercontainer2-row1-slide2">
                            <div className='sa-imagecontainer2-row1-slide2-image'>
                                {/* {!isLoading ? <img style={{borderTopLeftRadius: '12px', borderTopRightRadius: '12px'}} width='100%' height= '100%' src={products[4].imageUrl}/> : <img style={{borderTopLeftRadius: '12px', borderTopRightRadius: '12px'}} src={graySquare} width='100%' height='100%'/>} */}
                                { !isLoading ? <Link style={{height: '-webkit-fill-available'}} to={`productpage/${products[4].id}`} ><img style={{height: '100%'}}  className='container1-image' src={products[4].imageUrl}/></Link>  : <div></div>}
                            </div>
                            <div className="sa-row1-slide2-info">
                                <div className="sa-row1-slide2-title">{products[4].name}</div>
                                <div className="sa-row1-slide2-price">$30</div>
                            </div>
                        </div>
                        <div className="sa-images-innercontainer2-row1-slide3">
                            <div className='sa-imagecontainer2-row1-slide3-image'><img style={{height: '-webkit-fill-available',borderTopLeftRadius: '12px', borderTopRightRadius: '12px', }} src={graySquare} width='100%'/></div>
                            <div className="sa-row1-slide3-info">
                                <div className="sa-row1-slide3-title">More to Come</div>
                                <div className="sa-row1-slide3-price"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        :         
        
        <div className="sa-info-images-container">
        <div className="sa-info-container">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.</div>
        <div className="sa-images-container">
            <div className="sa-images-innercontainer1">
                <div className="sa-images-innercontainer1-leftslides">
                    <div className="sa-images-innercontainer1-slide1">
                        <div className='sa-imagecontainer-slide1'>
                            <img style={{borderTopLeftRadius: '12px', borderTopRightRadius: '12px'}} src={graySquare} width='100%' height='100%'/>
                            {/* {<img style={{borderTopLeftRadius: '12px', borderTopRightRadius: '12px'}} width='100%' height= '100%' src={products[0].imageUrl}/>} */}
                            {/* <img  src={product1} /> */}
                        </div>
                        <div className='sa-slide1-info'>
                        <div className='sa-slide1-title'></div>
                        <div className='sa-slide1-price'></div>
                        </div>
                    </div>
                    <div className="sa-images-innercontainer1-slide2">
                        <div className='sa-imagecontainer-slide2'>
                        <img style={{borderTopLeftRadius: '12px', borderTopRightRadius: '12px'}} src={graySquare} width='100%' height='100%'/>
                        {/* {!isLoading ? <img style={{borderTopLeftRadius: '12px', borderTopRightRadius: '12px'}} width='100%' height= '100%' src={products[5].imageUrl}/> : <div></div>} */}
                        </div>
                        <div className="sa-slide2-info">
                            <div className="sa-slide2-title"></div>
                            <div className="sa-slide2-price"></div>
                        </div>    
                    </div>
                </div>
                <div className="sa-images-innercontainer1-rightslides">
                    <div className="sa-images-innercontainer1-rightslides-slide1">
                        <div className='sa-imagecontainer-images-rightslides-slide1'>
                        <img style={{borderTopLeftRadius: '12px', borderTopRightRadius: '12px'}} src={graySquare} width='100%' height='100%'/>
                        {/* {!isLoading ? <img style={{borderTopLeftRadius: '12px', borderTopRightRadius: '12px'}} width='100%' height= '100%' src={products[14].imageUrl}/> : <div></div>} */}
                        </div>
                        <div className="sa-slide1-rightslides-info">
                            <div className="sa-slide1-rightslides-title"></div>
                            <div className="sa-slide1-rightslides-price"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sa-images-innercontainer2">
                <div className="sa-images-innercontainer2-row1">
                    <div className="sa-images-innercontainer2-row1-slide1">
                        <div className='sa-imagecontainer2-row1-slide1-image'>
                        <img style={{borderTopLeftRadius: '12px', borderTopRightRadius: '12px'}} src={graySquare} width='100%' height='100%'/>
                        {/* {!isLoading ? <img style={{borderTopLeftRadius: '12px', borderTopRightRadius: '12px'}} width='100%' height= '100%' src={products[15].imageUrl}/> : <div></div>} */}
                        </div>
                        <div className="sa-row1-slide1-info">
                            <div className="sa-row1-slide1-title"></div>
                            <div className="sa-row1-slide1-price"></div>
                        </div>
                    </div>
                    <div className="sa-images-innercontainer2-row1-slide2">
                        <div className='sa-imagecontainer2-row1-slide2-image'>
                        <img style={{borderTopLeftRadius: '12px', borderTopRightRadius: '12px'}} src={graySquare} width='100%' height='100%'/>
                            {/* {!isLoading ? <img style={{borderTopLeftRadius: '12px', borderTopRightRadius: '12px'}} width='100%' height= '100%' src={products[16].imageUrl}/> : <div></div>} */}
                        </div>
                        <div className="sa-row1-slide2-info">
                            <div className="sa-row1-slide2-title"></div>
                            <div className="sa-row1-slide2-price"></div>
                        </div>
                    </div>
                    <div className="sa-images-innercontainer2-row1-slide3">
                    <img style={{borderTopLeftRadius: '12px', borderTopRightRadius: '12px'}} src={graySquare} width='100%' height='100%'/>
                        {/* <div className='sa-imagecontainer2-row1-slide3-image'><img style={{borderTopLeftRadius: '12px', borderTopRightRadius: '12px'}} src={product3} width='100%' height= '100%'/></div> */}
                        <div className="sa-row1-slide3-info">
                            <div className="sa-row1-slide3-title"></div>
                            <div className="sa-row1-slide3-price"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        }
    </div>
  )
}

export default ShopAll