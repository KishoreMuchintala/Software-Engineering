import axios from 'axios';

// Base URL for the API
const API_BASE_URL = 'http://34.226.191.216:5000/api';

// Utility function for more detailed error logging
const handleApiError = (error) => {
  if (error.response) {
    console.error('API call failed:', error.response.status, error.response.data);
  } else if (error.request) {
    console.error('No response received from API:', error.request);
  } else {
    console.error('Error setting up API request:', error.message);
  }
  throw error;
};

// Fetch all products from backend
export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Fetch a single product by ID
export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Fetch cart items from backend
export const fetchCart = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/cart`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.data && response.data.items) {
      return response.data;
    } else {
      console.warn("Cart data structure unexpected:", response.data);
      return { items: [] }; // Default to empty array if items are missing
    }
  } catch (error) {
    console.error("Error fetching cart:", error);
    handleApiError(error);
  }
};

// Add item to cart
export const addToCart = async (product,token) => {
  try {
    console.log(product,1)
    const response = await axios.post(`${API_BASE_URL}/cart`, {
      product_id: product._id, // Ensure the correct ID is sent
      quantity: 1, // Default quantity to 1 or adjust as needed
  },
  {
    headers: { Authorization: `Bearer ${token}` },
  });
    console.log("addToCart response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error in addToCart API call:", error);
    handleApiError(error);
  }
};

// Update cart item quantity
export const updateCartItem = async (productId, quantity,token) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/cart/product/${productId}`, { quantity },{headers: { Authorization: `Bearer ${token}` }});
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Add item to cart (using the new /add route)
export const addTooCart = async (product, token) => {
  const productId = product.product_id ;
  console.log(productId)
  // Validate product ID to avoid making unnecessary API calls
  if (!productId) {
    console.error("Invalid product ID. Cannot add to cart.");
    return;
  }

  try {
    const response = await axios.post(`${API_BASE_URL}/cart/add`, {
      product_id: productId,
      quantity: 1, // Default quantity to 1, or customize as needed
      
    },{headers: { Authorization: `Bearer ${token}` }, });

    console.log("addToCart response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error in addToCart API call:", error);
    handleApiError(error);
  }
};

// Remove item from cart
export const removeFromCart = async (productId,token) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/cart/product/${productId}`,{ headers: { Authorization: `Bearer ${token}` }});
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Fetch wishlist items
// Fetch wishlist items
export const fetchWishlist = async (token) => {
  try {

    const response = await axios.get(`${API_BASE_URL}/wishlist`,{
      headers: { Authorization: `Bearer ${token}` 
    }});
    if (response.status === 200) {
      return response.data.products || []; // Return wishlist products or an empty array if not found
    } else if (response.status === 404) {
      console.warn("Wishlist not found.");
      return []; // No wishlist found, return an empty array
    } else {
      throw new Error('Unexpected response structure');
    }
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    handleApiError(error);
  }
};


// Add item to wishlist
export const addToWishlist = async (productId, token) => {
  try {

    console.log(token)
    const response = await axios.post(`${API_BASE_URL}/wishlist`, {
      product_id: productId,
    },{ 
      headers: { Authorization: `Bearer ${token}` },
    }
    );
    console.log(response)
    if (response.status === 201) {
      console.log("Product added to wishlist:", response.data);
      return response.data;
    } else if (response.status === 400 && response.data.message === 'Product already in wishlist') {
      alert("Product already in wishlist.");
      return null; // Product is already in wishlist
    } else {
      throw new Error('Failed to add product to wishlist');
    }
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    handleApiError(error);
  }
};

export const removeFromWishlist = async (productId,token) => {
  // Validate that productId is defined and correctly formatted
  try {
    const response = await axios.delete(`${API_BASE_URL}/wishlist/product/${productId}`,{
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
 
export const userRegister = async (formData) => {
  try{
    const response = await axios.post(`${API_BASE_URL}/auth/register`, {
    name: formData.name,
    email: formData.email,
    password: formData.password,
  });
  return response;
} catch (error){
  handleApiError(error)
}
}

export const userLogin = async (formData) => {
  try{
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      email: formData.email,
      password: formData.password,
    });
  return response;
} catch (error){
  handleApiError(error)
}
}


export const fetchProfile = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response
  } catch (error) {
    console.error("Error fetching Profile:", error);
    handleApiError(error);
  }
};


export const userUpdate = async (formData,token) => {
  try{
    const response = await axios.put(`${API_BASE_URL}/auth/profile`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  return response;
} catch (error){
  handleApiError(error)
}
}
