import { useOktaAuth } from '@okta/okta-react'
import { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { CartContext } from '../../Contexts/CartContext';
import '../ManageProductsPage/manageProductsPage.css'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { stringify } from 'querystring';

export const ManageProductsPage = () => {
  let selectProduct = 0
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

  interface EditProduct {
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
  const [selectedEditProduct, setSelectedEditProduct] = useState(-1)
  const [adminNewProductFormData, setAdminNewProductFormData] = useState({
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
  const [adminEditProductFormData, setAdminEditProductFormData] = useState({
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

  // useEffect(() => {
  //   console.log(selectedEditProduct)
  // },[selectedEditProduct])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('https://18.217.214.80:8080/api/orders/')
        const data = await response.json();
        setOrders(data)
        // console.log(data)
      } catch (error) {
        console.error('Error fetching orders:', error)
      }
    };
    fetchOrders();

    const fetchProducts = async () => {
      try {
        const response = await fetch('https://18.217.214.80:8080/api/products/')
        const data = await response.json();
        const responseData = data
        setProducts(responseData)
      } catch (error) {
        console.error('Error fetching orders:', error)
      }
    };
    fetchProducts();
    // console.log(products)
  }, [fetchTrigger])

  if (authState?.accessToken?.claims.userType === undefined) {
    return <Redirect to={'/'} />
  }



  const newProduct: AddProduct = {
    name: adminNewProductFormData.name,
    sku: adminNewProductFormData.sku,
    sizeSmall: adminNewProductFormData.sizeSmall,
    sizeMedium: adminNewProductFormData.sizeMedium,
    sizeLarge: adminNewProductFormData.sizeLarge,
    sizeExtraLarge: adminNewProductFormData.sizeExtraLarge,
    sizeExtraExtraLarge: adminNewProductFormData.sizeExtraExtraLarge,
    description: adminNewProductFormData.description,
    unitPrice: adminNewProductFormData.unitPrice,
    imageUrl: adminNewProductFormData.imageUrl,
    active: true,
    category: { id: adminNewProductFormData.category.id }
  }

  const editProduct: EditProduct = {
    name: adminEditProductFormData.name,
    sku: adminEditProductFormData.sku,
    sizeSmall: adminEditProductFormData.sizeSmall,
    sizeMedium: adminEditProductFormData.sizeMedium,
    sizeLarge: adminEditProductFormData.sizeLarge,
    sizeExtraLarge: adminEditProductFormData.sizeExtraLarge,
    sizeExtraExtraLarge: adminEditProductFormData.sizeExtraExtraLarge,
    description: adminEditProductFormData.description,
    unitPrice: adminEditProductFormData.unitPrice,
    imageUrl: adminEditProductFormData.imageUrl,
    active: true,
    category: { id: adminEditProductFormData.category.id }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(adminNewProductFormData.name === '' || 
        adminNewProductFormData.sku === ''  ||
        // adminNewProductFormData.sizeSmall === 0 || 
        // adminNewProductFormData.sizeMedium === 0 || 
        // adminNewProductFormData.sizeLarge === 0 ||
        // adminNewProductFormData.sizeExtraLarge === 0 ||
        // adminNewProductFormData.sizeExtraExtraLarge === 0 ||
        adminNewProductFormData.description === '' ||
        adminNewProductFormData.unitPrice === 0 ||
        adminNewProductFormData.imageUrl === '' ||   
        adminNewProductFormData.category.id === 0
        ) {

          toast.error("Please Complete all Forms")
  } else {
    // console.log(newProduct)
    // console.log("Sending data:", JSON.stringify(newProduct))
    
    
    // make POST request to server
    await fetch(`https://18.217.214.80:8080/api/products/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      
      body: JSON.stringify(newProduct)
    })
    .then(response => response.json())
    .then(data => toast.success("Product Added Successfully"))
    .catch(error => console.error(error));
    
    
    setAdminNewProductFormData({
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
  }
  };
  
  
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    
    setAdminNewProductFormData(prevFormData => ({
      ...prevFormData,
      [name]: name === 'category' ? { id: parseInt(value) } : value
    }));
    // console.log(adminNewProductFormData.category)
  };

  const handleEditChange = (event) => {
    const { name, value, type, checked } = event.target;
    
    setAdminEditProductFormData(prevFormData => ({
      ...prevFormData,
      [name]: name === 'category' ? { id: parseInt(value) } : value
    }));
    // console.log(adminEditProductFormData.category)
  };

  const deleteProduct = async (e) => {
    try {
      const response = await fetch(`https://18.217.214.80:8080/api/products/${e}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success("Product Deleted Successfully")
        // console.log('Product deleted successfully');
        setFetchTrigger((prev) => !prev);
      } else {
        console.error('Error deleting product:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

/* Now, we have to do a put function and place the new data based off of the selected id. Probably
wont need local variables because the state is set before clicking the submit button. */


  const handleEditProductChange = (event) => {
    const selectedProductId = parseInt(event.target.value);
    // console.log(selectedProductId)
    setSelectedEditProduct(selectedProductId);

    if (selectedProductId !== -1) {
      // console.log(selectedProductId)
      let selectedProduct 
      for(let i = 0; i < products.length; i++) {
        if(products[i].id === selectedProductId) {
          // console.log(products[i].id)
          // console.log(products[i].sku)
          let selectedProduct = products[i]

      // console.log(selectedProduct)
      setAdminEditProductFormData({
        ...adminEditProductFormData,
        name: selectedProduct.name,
        sku: selectedProduct.sku,
        sizeSmall: selectedProduct.sizeSmall,
        sizeMedium: selectedProduct.sizeMedium,
        sizeLarge: selectedProduct.sizeLarge,
        sizeExtraLarge: selectedProduct.sizeExtraLarge,
        sizeExtraExtraLarge: selectedProduct.sizeExtraExtraLarge,
        description: selectedProduct.description,
        unitPrice: selectedProduct.unitPrice,
        imageUrl: selectedProduct.imageUrl,
        category: selectedProduct.category
      });
    }
  }
    } else {
      setAdminEditProductFormData({
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
        category: { id: 0 },
      });
    }
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    // console.log(adminNewProductFormData)
    // console.log(newProduct)
    const url = `https://18.217.214.80:8080/api/products/${selectedEditProduct}`
    const options = {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(adminEditProductFormData)
    };
    const response = await fetch(url, options);
    if(response.status === 200) {
      // console.log("Successfully updated the values of the selected product")
      toast.success("Product Edited Successfully")

      setAdminEditProductFormData({
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
        category: { id: 0 },
      });
      setSelectedEditProduct(-1)
      setFetchTrigger((prev) => !prev);
    } else {
      console.error("Failed to update the quantity")
    }
  } 

  const markAsComplete = async (orderId) => {
    try {
      // Fetch the current order
      const orderResponse = await fetch(`https://18.217.214.80:8080/api/orders/${orderId}`);
      if (!orderResponse.ok) {
        throw new Error(`Error fetching order: ${orderResponse.statusText}`);
      }
      const order = await orderResponse.json();
  
      // Update the status
      const setStatus = !order.status;
      // console.log(setStatus);
      const url = `https://18.217.214.80:8080/api/orders/${orderId}/status`;
      const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(setStatus),
      };
  
      const response = await fetch(url, options);
      setFetchTrigger((prev) => !prev);
      if (response.status === 200) {
        // console.log("The Order Status was successfully changed");
        toast.success("The Order Status was Successful Changed")
      } else {
        console.error("Failed to Update the Order Status");
      }
    } catch (error) {
      console.error(error.message);
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
              <input className='admin-input-form-input' type="text" name="name" value={adminNewProductFormData.name} onChange={handleChange} />
            </label>
            <label className='admin-input-label'>
              SKU:
              <input className='admin-input-form-input' type="text" name="sku" value={adminNewProductFormData.sku} onChange={handleChange} />
            </label>
            <div className='admin-size-input-container'>
              <h4 style={{ marginBottom: '10px', marginTop: '0px' }}>Sizes:</h4>
              <label className='admin-input-label'> Small
                <input className='admin-input-form-input' min={0} type="number" name="sizeSmall" value={adminNewProductFormData.sizeSmall} onChange={handleChange} />
              </label>

              <label className='admin-input-label'> Medium
                <input className='admin-input-form-input' min={0} type="number" name="sizeMedium" value={adminNewProductFormData.sizeMedium} onChange={handleChange} />
              </label>

              <label className='admin-input-label'> Large
                <input className='admin-input-form-input' min={0} type="number" name="sizeLarge" value={adminNewProductFormData.sizeLarge} onChange={handleChange} />
              </label>

              <label className='admin-input-label'> Extra Large
                <input className='admin-input-form-input' min={0} type="number" name="sizeExtraLarge" value={adminNewProductFormData.sizeExtraLarge} onChange={handleChange} />
              </label>

              <label className='admin-input-label'> Extra Extra Large
                <input className='admin-input-form-input' min={0} type="number" name="sizeExtraExtraLarge" value={adminNewProductFormData.sizeExtraExtraLarge} onChange={handleChange} />
              </label>

            </div>
            <label className='admin-input-label'>
              Description:
              <input className='admin-input-form-input' type="test" name="description" value={adminNewProductFormData.description} onChange={handleChange} />
            </label>
            <label className='admin-input-label'>
              Price:
              <input className='admin-input-form-input' min={0} type="number" name="unitPrice" value={adminNewProductFormData.unitPrice} onChange={handleChange} />
            </label>
            <label className='admin-input-label'>
              Image URL:
              <input className='admin-input-form-input' type="text" name="imageUrl" value={adminNewProductFormData.imageUrl} onChange={handleChange} />
            </label>
            <label className='admin-input-label'> Product Category
              <select className='admin-input-form-input' name="category" value={adminNewProductFormData.category.id} onChange={handleChange}>
                <option value={0}>Select a Category</option>
                <option value={1}>Shirts</option>
                <option value={2}>Posters</option>
              </select>
            </label>
            <button style={{ cursor: 'pointer', fontFamily: 'JetBrains Mono' }} onClick={handleSubmit}>SUBMIT NEW PRODUCT</button>
          </form>

        </div>
        <div className='admin-add-product-container'>
          <form className='admin-input-form'>
            <h1>Edit Product</h1>
            <label className='admin-input-label'>
              Existing Product:
              <select className='admin-edit-product-select-name' value={selectedEditProduct} name='product' onChange={handleEditProductChange}>
                <option  value={-1} >Select a Product</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>{product.name}</option>
                ))}
              </select>
            </label>
            <label className='admin-input-label'>
              Name:
              <input className='admin-input-form-input' type="text" name="name" value={adminEditProductFormData.name} onChange={handleEditChange} />
            </label>
            <label className='admin-input-label'>
              SKU:
              <input className='admin-input-form-input' type="text" name="sku" value={adminEditProductFormData.sku} onChange={handleEditChange} />
            </label>
            <div className='admin-size-input-container'>
              <h4 style={{ marginBottom: '10px', marginTop: '0px' }}>Sizes:</h4>
              <label className='admin-input-label'> Small
                <input className='admin-input-form-input' min={0} type="number" name="sizeSmall" value={adminEditProductFormData.sizeSmall} onChange={handleEditChange} />
              </label>

              <label className='admin-input-label'> Medium
                <input className='admin-input-form-input' min={0} type="number" name="sizeMedium" value={adminEditProductFormData.sizeMedium} onChange={handleEditChange} />
              </label>

              <label className='admin-input-label'> Large
                <input className='admin-input-form-input' min={0} type="number" name="sizeLarge" value={adminEditProductFormData.sizeLarge} onChange={handleEditChange} />
              </label>

              <label className='admin-input-label'> Extra Large
                <input className='admin-input-form-input' min={0} type="number" name="sizeExtraLarge" value={adminEditProductFormData.sizeExtraLarge} onChange={handleEditChange} />
              </label>

              <label className='admin-input-label'> Extra Extra Large
                <input className='admin-input-form-input' min={0} type="number" name="sizeExtraExtraLarge" value={adminEditProductFormData.sizeExtraExtraLarge} onChange={handleEditChange} />
              </label>

            </div>
            <label className='admin-input-label'>
              Description:
              <input className='admin-input-form-input' type="test" name="description" value={adminEditProductFormData.description} onChange={handleEditChange} />
            </label>
            <label className='admin-input-label'>
              Price:
              <input className='admin-input-form-input' min={0} type="number" name="unitPrice" value={adminEditProductFormData.unitPrice} onChange={handleEditChange} />
            </label>
            <label className='admin-input-label'>
              Image URL:
              <input className='admin-input-form-input' type="text" name="imageUrl" value={adminEditProductFormData.imageUrl} onChange={handleEditChange} />
            </label>
            <label className='admin-input-label'> Product Category
              <select className='admin-input-form-input' name="category" value={adminEditProductFormData.category.id} onChange={handleEditChange}>
                <option value={0}>Select a Category</option>
                <option value={1}>Shirts</option>
                <option value={2}>Posters</option>
              </select>
            </label>
            <button style={{ cursor: 'pointer', fontFamily: 'JetBrains Mono' }} onClick={handleEdit}>SUBMIT EDITS</button>
          </form>

        </div>
      </div>
        <div className='admin-remove-product-container'>
          <h1>Remove Product</h1>
          <table style={{borderCollapse: 'collapse', minWidth: '1200px'}}>
            <thead>
              <tr style={{borderBottom: '1px solid #c3c3c3'}}>
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
                <tr key={product.id} style={{borderBottom: '1px solid #c3c3c3'}}>
                  <td><button style={{ cursor: 'pointer', fontFamily: 'JetBrains Mono' }} onClick={() => { deleteProduct(product.id) }}>Remove</button></td>
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

      <div className='admin-order-list-container'>
        <h1>Order List</h1>
        <table style={{borderCollapse: 'collapse', minWidth: '1200px'}}>
          <thead>
            <tr style={{borderBottom: "1px solid #c3c3c3"}}>
              <th>Mark as Complete</th>
              <th>ID</th>
              <th>Tracking Number</th>
              <th>Total Price</th>
              <th>Total Quantity</th>
              {/* <th>Billing Address ID</th> */}
              <th>Customer ID</th>
              <th>Shipping Address ID</th>
              <th>Status</th>
              <th>Date Created</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} style={{borderBottom: "1px solid #c3c3c3"}} >
                <td><button style={{ cursor: 'pointer', fontFamily: 'JetBrains Mono', backgroundColor: order.status ? "green" : 'red' }} onClick={() => {markAsComplete(order.id)}}>{order.status ? "Mark As Completed" : "Mark As Incomplete"}</button></td>
                <td>{order.id}</td>
                <td>{order.orderTrackingNumber}</td>
                <td>${order.totalPrice}</td>
                <td>{order.totalQuantity}</td>
                {/* <td>{order.billingAddressId}</td> */}
                <td>{order.customer.id}</td>
                <td>{order.shippingAddressId.id}</td>
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