import './App.scss'
import { Route, Switch } from 'react-router'
import { Header } from './features/pages/shop/common/header/Header'
import { PatioPage } from './features/pages/shop/catalogue/patio/Patio'
import { CartDrawer } from './features/pages/shop/common/cart/Cart'

/**
 * Patio is just one type of category
 * Use router for other possible categories
 *
 * @returns
 */
const ShopCategoryRouter = () => {
  return (
    <Switch>
      <Route path="/">
        <PatioPage />
      </Route>
    </Switch>
  )
}

/**
 * Contains the entire shop page content
 *
 * Includes:
 * - the header, which contains the page's title and navigation such as cart
 * - a page router, which is used to switch between category pages, such as the patio page
 * - cart drawer, which can be accessed when clicking the cart button on the header
 * @returns
 */
const Shop = () => (
  <div className="App">
    <Header />
    <ShopCategoryRouter />
    <CartDrawer />
  </div>
)

export default Shop
