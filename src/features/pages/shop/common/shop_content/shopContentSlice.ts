import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  createSelector,
} from '@reduxjs/toolkit'
import { RootState } from '../../../../../app/store'

type Status = 'idle' | 'pending' | 'failed'

export type TProduct = {
  _id: string
  imageURLs: string[]
  casePackQty: number
  modifiedOn: string
  createdOn: string
  SKU: string
  MAP: number
  itemName: string
  material: string
  width: number
  length: number
  height: number
  weight: number
  color: string
  vendorProductCategory: string
  vendorItemDescription: string
  tradePrice: number
  itemLink: string
  weightUnit: string
  dimensionUnit: string
  MSRP: number
  tradeCurrency: string
  variants: string
  vendorName: string
  vendorID: string
  vendorAirtableID: string
  vendorRegion: string
  vendorProductName: string
  dimension: string
  stockQty: number
  stockDate: string
  restockDate: string
  fulhausCategory: string
  __v: number
  top5Colors: string[]
}

export type TProductsAPI = TProduct[]

export type TProductsMap = { [key: string]: TProduct }

type TFetchProductsParams = { api: { fetchProducts: any }; category: string }

const selectProducts = (state: RootState) => state.products

/**
 * Entity adapters are for database like states
 * It includes CRUD utils and operations to update state
 */
export const productsAdapter = createEntityAdapter<TProduct>({
  selectId: (product) => product._id,
})
export const productSelectors = productsAdapter.getSelectors(selectProducts)
export const selectProductStatus = createSelector(
  selectProducts,
  (products) => products.status
)

// Main actions
// Thunks for API requests
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ api, category }: TFetchProductsParams) => {
    const { data } = await api.fetchProducts()
    return { data, category }
  }
)

const productsSlice = createSlice({
  name: 'products',
  initialState: productsAdapter.getInitialState({
    category: '',
    status: 'idle' as Status,
  }),
  reducers: {
    clear: (state) => {
      state.category = ''
      state.status = 'idle'
      productsAdapter.removeAll(state)
    },
  },
  extraReducers: (builder) => {
    // Reducers for fetching products
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        const { data, category } = action.payload
        state.status = 'idle'
        state.category = category
        productsAdapter.setAll(state, data)
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export const productsActions = productsSlice.actions

export default productsSlice.reducer
