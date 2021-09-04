import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../../../../app/store'
import {
  productSelectors,
  TProductsMap,
} from '../shop_content/shopContentSlice'

type TCartIsDrawerOpen = boolean
type TCartProductIds = string
type TCartProductQuantities = { [key: string]: number }
type TCartError = string | null
type TCartItems = {
  ids: TCartProductIds[]
  quantities: TCartProductQuantities
}

export type TCartState = {
  isDrawerOpen: TCartIsDrawerOpen
  cartItems: TCartItems
  error: TCartError
}

const initialState: TCartState = {
  isDrawerOpen: false,
  cartItems: {
    ids: [],
    quantities: {},
  },
  error: null,
}

export const selectCart = (state: RootState) => state.cart
export const selectIsDrawerOpen = createSelector(
  selectCart,
  (cart) => cart.isDrawerOpen
)
export const selectCartItems = createSelector(
  selectCart,
  (cart) => cart.cartItems
)
export const selectCartIds = createSelector(
  selectCartItems,
  (items) => items.ids
)
export const selectCartQuantities = createSelector(
  selectCartItems,
  (items) => items.quantities
)

export const selectValidCartItems = createSelector(
  productSelectors.selectEntities,
  selectCartIds,
  (products, ids) =>
    ids.reduce((acc, id) => {
      const product = products[id]
      if (product) acc[id] = product

      return acc
    }, {} as TProductsMap)
)
export const selectCartTotal = createSelector(
  selectValidCartItems,
  selectCartIds,
  selectCartQuantities,
  (products, ids, quantities) =>
    ids.reduce((acc, id) => {
      const product = products[id]

      const price = product.MSRP
      const quantity = quantities[id]

      return acc + price * quantity
    }, 0)
)
export const selectCartItemsBasicDetail = createSelector(
  selectValidCartItems,
  selectCartIds,
  selectCartQuantities,
  (products, ids, quantities) =>
    ids.map((id) => {
      const { _id, MSRP, vendorName, vendorProductName, itemLink } =
        products[id]
      const quantity = quantities[id]
      return {
        id: _id,
        imageLink: itemLink,
        brandName: vendorName,
        productName: vendorProductName,
        totalPrice: MSRP * quantity,
        price: MSRP,
        quantity,
      }
    })
)

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    closeDrawer: (state) => {
      state.isDrawerOpen = false
    },
    openDrawer: (state) => {
      state.isDrawerOpen = true
    },
    toggleDrawer: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const id = action.payload
      const cartItems = state.cartItems

      if (cartItems.ids.includes(id)) {
        if (cartItems.quantities[id] <= 1) {
          delete cartItems.quantities[id]
          const idIndex = cartItems.ids.indexOf(id)
          cartItems.ids.splice(idIndex, 1)
        } else {
          cartItems.quantities[id]--
        }
      } else {
        state.error = 'Item is no longer in the cart'
      }
    },
    addItem: (state, action: PayloadAction<string>) => {
      const id = action.payload
      const cartItems = state.cartItems
      if (!state.cartItems.ids.includes(id)) {
        cartItems.ids.push(id)
        cartItems.quantities[id] = 0
      }

      cartItems.quantities[id]++
    },
  },
})

export const cartActions = cartSlice.actions

export default cartSlice.reducer
