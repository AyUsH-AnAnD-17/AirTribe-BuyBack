import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchAllProducts, fetchProductById } from '../services/api'

// Async thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetchAllProducts()
    return response
  }
)

export const fetchProduct = createAsyncThunk(
  'products/fetchProduct',
  async (id) => {
    const response = await fetchProductById(id)
    return response
  }
)

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    selectedProduct: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      // Fetch single product
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false
        state.selectedProduct = action.payload
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export const { clearSelectedProduct } = productSlice.actions
export default productSlice.reducer