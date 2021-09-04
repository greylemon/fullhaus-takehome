import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ShopContent } from '../../common/shop_content/ShopContent'
import {
  fetchProducts,
  productsActions,
} from '../../common/shop_content/shopContentSlice'
import { patioAPI } from './patioAPI'

export const PatioPage = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchProducts({ api: patioAPI, category: 'patio' }))
    return () => {
      dispatch(productsActions.clear())
    }
  }, [dispatch])

  return <ShopContent name="Patio Furniture" />
}
