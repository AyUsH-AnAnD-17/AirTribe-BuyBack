import { createSlice } from '@reduxjs/toolkit'

// Load cart from localStorage
const loadCartFromStorage = () => {
  try {
    const serializedCart = localStorage.getItem('airtribe-cart')
    if (serializedCart === null) {
      return []
    }
    return JSON.parse(serializedCart)
  } catch (err) {
    console.error('Error loading cart:', err);
    return []
  }
}

// Save cart to localStorage
const saveCartToStorage = (cartItems) => {
  try {
    const serializedCart = JSON.stringify(cartItems)
    localStorage.setItem('airtribe-cart', serializedCart)
  } catch (err) {
    console.error('Could not save cart to localStorage:', err)
  }
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadCartFromStorage(),
  },
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity } = action.payload
      const existingItem = state.items.find(item => item.id === product.id)
      
      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        state.items.push({
          ...product,
          quantity: quantity
        })
      }
      
      saveCartToStorage(state.items)
    },
    removeFromCart: (state, action) => {
      const productId = action.payload
      state.items = state.items.filter(item => item.id !== productId)
      saveCartToStorage(state.items)
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const item = state.items.find(item => item.id === id)
      if (item && quantity > 0) {
        item.quantity = quantity
        saveCartToStorage(state.items)
      }
    },
    clearCart: (state) => {
      state.items = []
      saveCartToStorage(state.items)
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions

// Selectors
export const selectCartItems = (state) => state.cart.items
export const selectCartTotal = (state) => 
  state.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0)
export const selectCartItemsCount = (state) => 
  state.cart.items.reduce((total, item) => total + item.quantity, 0)

export default cartSlice.reducer