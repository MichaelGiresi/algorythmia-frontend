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
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [fetchTrigger, setFetchTrigger] = useState(false)
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
    category: {
      id: 0
    }
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/orders/')
        const data = await response.json();
        setOrders(data)
      } catch (error) {
        console.error('Error fetching orders:', error)
      }
    };
    fetchOrders();
  }, [fetchTrigger])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/products')
        const data = await response.json();
        const responseData = data._embedded.products
        setProducts(responseData)
      } catch (error) {
        console.error('Error fetching orders:', error)
      }
    };
    fetchProducts();
    console.log(products)
  }, [fetchTrigger])

  if (authState?.accessToken?.claims.userType === undefined) {
    return <Redirect to={'/'} />
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
    category: { id: adminFormData.category.id }
  }

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

    setAdminFormData({
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
      category: {
        id: 0
      }
    })
    setFetchTrigger((prev) => !prev);
  };


  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setAdminFormData(prevFormData => ({
      ...prevFormData,
      [name]: name === 'category' ? { id: parseInt(value) } : value
    }));
    console.log(adminFormData.category)
  };

  const deleteProduct = async (e) => {
    try {
      const response = await fetch(`http://localhost:8080/api/products/${e}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Product deleted successfully');
        setFetchTrigger((prev) => !prev);
        // You may also want to update your UI, e.g., remove the product from the list
      } else {
        console.error('Error deleting product:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };




  return (

    <div className='admin-page'>

      <div className='admin-add-remove-product-container'>

        <div className='admin-add-product-container'>
          <form className='admin-input-form'>
            <h1>New Product</h1>
            <label className='admin-input-label'>
              Name:
              <input className='admin-input-form-input' type="text" name="name" value={adminFormData.name} onChange={handleChange} />
            </label>
            <label className='admin-input-label'>
              SKU:
              <input className='admin-input-form-input' type="text" name="sku" value={adminFormData.sku} onChange={handleChange} />
            </label>
            <div className='admin-size-input-container'>
              <h4 style={{ marginBottom: '10px', marginTop: '0px' }}>Sizes:</h4>
              <label className='admin-input-label'> Small
                <input className='admin-input-form-input' type="number" name="sizeSmall" value={adminFormData.sizeSmall} onChange={handleChange} />
              </label>

              <label className='admin-input-label'> Medium
                <input className='admin-input-form-input' type="number" name="sizeMedium" value={adminFormData.sizeMedium} onChange={handleChange} />
              </label>

              <label className='admin-input-label'> Large
                <input className='admin-input-form-input' type="number" name="sizeLarge" value={adminFormData.sizeLarge} onChange={handleChange} />
              </label>

              <label className='admin-input-label'> Extra Large
                <input className='admin-input-form-input' type="number" name="sizeExtraLarge" value={adminFormData.sizeExtraLarge} onChange={handleChange} />
              </label>

              <label className='admin-input-label'> Extra Extra Large
                <input className='admin-input-form-input' type="number" name="sizeExtraExtraLarge" value={adminFormData.sizeExtraExtraLarge} onChange={handleChange} />
              </label>

            </div>
            <label className='admin-input-label'>
              Description:
              <input className='admin-input-form-input' type="test" name="description" value={adminFormData.description} onChange={handleChange} />
            </label>
            <label className='admin-input-label'>
              Price:
              <input className='admin-input-form-input' type="number" name="unitPrice" value={adminFormData.unitPrice} onChange={handleChange} />
            </label>
            <label className='admin-input-label'>
              Image URL:
              <input className='admin-input-form-input' type="text" name="imageUrl" value={adminFormData.imageUrl} onChange={handleChange} />
            </label>
            <label className='admin-input-label'> Product Category
              <select className='admin-input-form-input' name="category" value={adminFormData.category.id} onChange={handleChange}>
                <option value={0}>Select a Category</option>
                <option value={1}>Shirts</option>
                <option value={2}>Posters</option>
              </select>
            </label>
            <button style={{ cursor: 'pointer', fontFamily: 'JetBrains Mono' }} onClick={handleSubmit}>Submit New Product</button>
          </form>

        </div>
        <div className='admin-remove-product-container'>
          <h1>Remove Product</h1>
          <table>
            <thead>
              <tr>
                <th>Remove</th>
                <th>ID</th>
                <th>SKU</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Active</th>
                <th>Date Created</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td><button style={{ cursor: 'pointer' }} onClick={() => { deleteProduct(product.id) }}>Remove</button></td>
                  <td>{product.id}</td>
                  <td>{product.sku}</td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.unitPrice}</td>
                  <td>{product.active ? 'Active' : 'Inactive'}</td>
                  <td>{product.dateCreated}</td>
                  <td>{product.lastUpdated}</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className='admin-order-list-container'>
        <h1>OrderList</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tracking Number</th>
              <th>Total Price</th>
              <th>Total Quantity</th>
              <th>Billing Address ID</th>
              <th>Customer ID</th>
              <th>Shipping Address ID</th>
              <th>Status</th>
              <th>Date Created</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.orderTrackingNumber}</td>
                <td>${order.totalPrice}</td>
                <td>{order.totalQuantity}</td>
                <td>{order.billingAddressId}</td>
                <td>{order.customerId}</td>
                <td>{order.shippingAddressId}</td>
                <td>{order.status ? 'Active' : 'Inactive'}</td>
                <td>{order.dateCreated}</td>
                <td>{order.lastUpdated}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>

  );
}