import { useOktaAuth } from '@okta/okta-react'
import { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { CartContext } from '../../Contexts/CartContext';
import '../ManageProductsPage/manageProductsPage.css'

export const ManageProductsPage = () => {
  interface AddProduct {
      name: String,
      sku: String,
      sizeSmall: Number,
      sizeMedium: Number,
      sizeLarge: Number,
      sizeExtraLarge: Number,
      sizeExtraExtraLarge: Number,
      description: String,
      unitPrice: Number,
      imageUrl: String,
      active: Boolean,
      category: {
        id: Number;
      };
  }
  const { authState } = useOktaAuth();
  const cartContext = useContext(CartContext)
  const [addProductPage, setAddProductPage] = useState(true)
  const [orderListPage, setOrderListPage] = useState(false)
  const [productCats, setProductCats] = useState()
  const [productCatsIds, setProductCatsIds] = useState()
  const [adminFormData, setAdminFormData] = useState({
    name: '',
    sku: '',
    sizeSmall: 0,
    sizeMedium: 0,
    sizeLarge: 0,
    sizeExtraLarge: 0,
    sizeExtraExtraLarge: 0,
    description: '',
    unitPrice: 0,
    imageUrl: '',
    active: true,
    category:  {
      id: 0}
    });

    useEffect(() => {
      console.log(adminFormData.category.id)
    },[adminFormData])
    if(authState?.accessToken?.claims.userType === undefined){
        return <Redirect to={'/'}/>
    }



      const newProduct: AddProduct = {
        name: adminFormData.name,
        sku: adminFormData.sku,
        sizeSmall: adminFormData.sizeSmall,
        sizeMedium: adminFormData.sizeMedium,
        sizeLarge: adminFormData.sizeLarge,
        sizeExtraLarge: adminFormData.sizeExtraLarge,
        sizeExtraExtraLarge: adminFormData.sizeExtraExtraLarge,
        description: adminFormData.description,
        unitPrice: adminFormData.unitPrice,
        imageUrl: adminFormData.imageUrl,
        active: true,
        category: {id: adminFormData.category.id}
      }
      
      // const newProduct = {
      //   "category": {
      //     "id": 1
      // },
      // "sku": "ABC123",
      // "name": "Example Shirt",
      // "sizeSmall": 10,
      // "sizeMedium": 20,
      // "sizeLarge": 30,
      // "sizeExtraLarge": 40,
      // "sizeExtraExtraLarge": 50,
      // "description": "An example shirt",
      // "unitPrice": 19.99,
      // "imageUrl": "https://example.com/shirt.jpg",
      // "active": true
      // }

      const handleSubmit = (event) => {
        console.log("Sending data:", JSON.stringify(newProduct))
        event.preventDefault();
    
        // make POST request to server
        fetch(`http://localhost:8080/api/products/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          
          body: JSON.stringify(newProduct)
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
      };
      
    
      const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
    
        setAdminFormData(prevFormData => ({
          ...prevFormData,
          [name]: name === 'category' ? {id: parseInt(value) } : value
        }));
        console.log(adminFormData.category)
      };

    return (
    
    <div>

            <div className='admin-add-product-container'>
                <h1>New Product</h1>
                <form className='admin-input-form'>
                    <label className='admin-input-label'>
                        Name:
                        <input className='admin-input-form-input' type="text" name="name" value={adminFormData.name} onChange={handleChange}/>
                    </label>
                    <label className='admin-input-label'>
                        SKU:
                        <input className='admin-input-form-input' type="text" name="sku" value={adminFormData.sku} onChange={handleChange}/>
                    </label>
                    <div className='admin-size-input-container'>
                        <h4 style={{marginBottom: '10px', marginTop: '0px'}}>Sizes:</h4>
                        <label className='admin-input-label'> Small
                          <input className='admin-input-form-input' type="number" name="sizeSmall" value={adminFormData.sizeSmall} onChange={handleChange}/>
                        </label>

                        <label className='admin-input-label'> Medium
                          <input className='admin-input-form-input' type="number" name="sizeMedium" value={adminFormData.sizeMedium} onChange={handleChange}/>
                        </label>

                        <label className='admin-input-label'> Large                
                          <input className='admin-input-form-input' type="number" name="sizeLarge" value={adminFormData.sizeLarge} onChange={handleChange}/>
                        </label>

                        <label className='admin-input-label'> Extra Large
                        <input className='admin-input-form-input' type="number" name="sizeExtraLarge" value={adminFormData.sizeExtraLarge} onChange={handleChange}/>
                        </label>

                        <label className='admin-input-label'> Extra Extra Large
                        <input className='admin-input-form-input' type="number" name="sizeExtraExtraLarge" value={adminFormData.sizeExtraExtraLarge} onChange={handleChange}/>
                        </label>

                    </div>
                    <label className='admin-input-label'>
                        Description:
                        <input className='admin-input-form-input' type="test" name="description" value={adminFormData.description} onChange={handleChange}/>
                    </label>
                    <label className='admin-input-label'>
                        Price:
                        <input className='admin-input-form-input' type="number" name="unitPrice" value={adminFormData.unitPrice} onChange={handleChange}/>
                    </label>
                    <label className='admin-input-label'>
                        Image URL:
                        <input className='admin-input-form-input' type="text" name="imageUrl" value={adminFormData.imageUrl} onChange={handleChange}/>
                    </label>
                    <label className='admin-input-label'> Product Category
                      <select className='admin-input-form-input' name="category" value={adminFormData.category.id} onChange={handleChange}>
                        <option value={0}>Select a Category</option>
                        <option value={1}>Shirts</option>
                        <option value={2}>Posters</option>
                      </select>
                    </label>
                </form>
                <button onClick={handleSubmit}>Submit New Product</button>

            </div> 
        
       
            <div>
        
        
            </div>
        
    </div>
    
    );
}