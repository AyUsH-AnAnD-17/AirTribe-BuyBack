import axios from 'axios'

const BASE_URL = 'https://fakestoreapi.com'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
})

// Fetch all products
export const fetchAllProducts = async () => {
  try {
    const response = await api.get('/products')
    return response.data
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}

// Fetch product by ID
export const fetchProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching product:', error)
    throw error
  }
}

// Fetch products by category
export const fetchProductsByCategory = async (category) => {
  try {
    const response = await api.get(`/products/category/${category}`)
    return response.data
  } catch (error) {
    console.error('Error fetching products by category:', error)
    throw error
  }
}

// Fetch all categories
export const fetchCategories = async () => {
  try {
    const response = await api.get('/products/categories')
    return response.data
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw error
  }
}

export default api