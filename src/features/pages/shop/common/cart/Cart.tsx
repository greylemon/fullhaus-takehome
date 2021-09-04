import { FunctionComponent, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../../../../app/hooks'
import { BlackButton, CloseButton } from '../button/button'
import styles from './Cart.module.scss'
import {
  cartActions,
  selectCartItemsBasicDetail,
  selectCartTotal,
  selectIsDrawerOpen,
} from './cartSlice'

type TCartItemModelProps = {
  productName: string
  brandName: string
}

type TCartItemPrice = {
  totalPrice: number
  price: number
  quantity: number
}

type TCartItemDescriptionSection = {
  productName: string
  brandName: string
  totalPrice: number
  price: number
  quantity: number
}

type TCartItemImage = {
  imageLink: string
}

type TCartItem = {
  id: string
  imageLink: string
  productName: string
  brandName: string
  totalPrice: number
  price: number
  quantity: number
}

type TCartDeleteItemButton = {
  id: string
}

const CartTotalSection = () => {
  const total = useAppSelector(selectCartTotal)
  return (
    <div className={styles.total}>
      <p>Total</p>
      <p>${total}</p>
    </div>
  )
}

const CartDeleteItemButton: FunctionComponent<TCartDeleteItemButton> = ({
  id,
}) => {
  const dispatch = useDispatch()
  const handleClick = useCallback(() => {
    dispatch(cartActions.removeItem(id))
  }, [id, dispatch])
  return <CloseButton onClick={handleClick} />
}
const CartItemImage: FunctionComponent<TCartItemImage> = ({ imageLink }) => (
  <img className={styles.cartItemImage} src={imageLink} alt="" />
)
const CartItemModel: FunctionComponent<TCartItemModelProps> = ({
  brandName,
  productName,
}) => (
  <div className={styles.cartItemModel}>
    <p className={styles.cartItemModel__productName}>{productName}</p>
    <p className={styles.cartItemModel__brandName}>{brandName}</p>
  </div>
)
const CartItemPrice: FunctionComponent<TCartItemPrice> = ({
  totalPrice,
  price,
  quantity,
}) => (
  <div>
    <p className={styles.cartItemPrice__totalBreakdown}>
      ${price} x {quantity} piece(s)
    </p>
    <p className={styles.cartItemPrice__total}>Total: ${totalPrice}</p>
  </div>
)
const CartItemDescriptionSection: FunctionComponent<TCartItemDescriptionSection> =
  ({ brandName, productName, totalPrice, price, quantity }) => (
    <div className={styles.cartDescription}>
      <CartItemModel brandName={brandName} productName={productName} />
      <CartItemPrice
        totalPrice={totalPrice}
        price={price}
        quantity={quantity}
      />
    </div>
  )
const CartItem: FunctionComponent<TCartItem> = ({
  id,
  imageLink,
  brandName,
  productName,
  totalPrice,
  price,
  quantity,
}) => (
  <div className={styles.cartItem}>
    <CartItemImage imageLink={imageLink} />
    <CartItemDescriptionSection
      brandName={brandName}
      productName={productName}
      totalPrice={totalPrice}
      price={price}
      quantity={quantity}
    />
    <CartDeleteItemButton id={id} />
  </div>
)

const CartItemsList = () => {
  const products = useAppSelector(selectCartItemsBasicDetail)

  return (
    <div className={styles.cartItemsList}>
      {products.map((product) => (
        <CartItem key={product.id} {...product} />
      ))}
    </div>
  )
}

const CheckOutButton = () => {
  const handleClick = () => {}
  return (
    <div className={styles.cartSummary__button}>
      <BlackButton
        style={{ width: '100%' }}
        name="checkout"
        onClick={handleClick}
      />
    </div>
  )
}

const CartFirstSection = () => <CartItemsList />
const CartSecondSection = () => (
  <div className={styles.cartSummary}>
    <CartTotalSection />
    <CheckOutButton />
  </div>
)

/**
 * Cart drawer which contains the user's cart content
 *
 * Contains the cart items along with quantity, product price, and total price
 */
export const CartDrawer = () => {
  const isDrawerOpen = useAppSelector(selectIsDrawerOpen)
  return (
    <div className={`${styles.cart} ${isDrawerOpen && styles.cart_visible}`}>
      <div className={styles.cartContent}>
        <CartFirstSection />
        <CartSecondSection />
      </div>
    </div>
  )
}

/**
 * Cart button for the shop header
 * Can open and close the cart drawer
 */
export const CartButton = () => {
  const dispatch = useDispatch()
  const handleClick = useCallback(() => {
    dispatch(cartActions.toggleDrawer())
  }, [dispatch])
  return <BlackButton name="cart" onClick={handleClick} />
}
