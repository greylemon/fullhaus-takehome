import { FunctionComponent, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../../../../app/hooks'
import { BlackButton } from '../button/button'
import { cartActions } from '../cart/cartSlice'
import { Loading } from '../loading/Loading'
import styles from './ShopContent.module.scss'
import { productSelectors, selectProductStatus } from './shopContentSlice'

type TShopContentProps = {
  name: string
}

type TCategoryLabelProps = {
  name: string
}

type TCategoryDescriptionProps = {
  name: string
}

type TCategoryOverviewProps = {
  name: string
}

type TProductProps = {
  id: string
  imageLink: string
  productName: string
  brandName: string
  price: number
}

type TProductImageProps = {
  imageLink: string
  productName: string
  onMouseEnter: () => void
}

type TProductHoveredProps = {
  id: string
  productName: string
  brandName: string
  price: number
  onMouseLeave: () => void
}

type TProductTextSectionProps = {
  brandName: string
  productName: string
}

type TProductOrderSectionProps = {
  id: string
  price: number
}

const CategoryImage: FunctionComponent = () => (
  <div className={styles.categoryOverview__image} />
)

const CategoryLabel: FunctionComponent<TCategoryLabelProps> = ({ name }) => (
  <p className={styles.categoryDescription__text}>{name}</p>
)
const CategoryShopButton = () => {
  return (
    <BlackButton>
      <a className={styles.shopButton} href="#products-list">
        SHOP
      </a>
    </BlackButton>
  )
}

const CategoryDescription: FunctionComponent<TCategoryDescriptionProps> = ({
  name,
}) => (
  <div className={styles.categoryDescription}>
    <CategoryLabel name={name} />
    <CategoryShopButton />
  </div>
)

const CategoryOverview: FunctionComponent<TCategoryOverviewProps> = ({
  name,
}) => {
  return (
    <div className={styles.categoryOverview}>
      <CategoryImage />
      <CategoryDescription name={name} />
    </div>
  )
}

const ProductTextSection: FunctionComponent<TProductTextSectionProps> = ({
  productName,
  brandName,
}) => (
  <div>
    <p className={styles.productInfo__name}>{productName}</p>
    <p className={styles.productInfo__brand}>{brandName}</p>
  </div>
)

const ProductOrderSection: FunctionComponent<TProductOrderSectionProps> = ({
  id,
  price,
}) => {
  const dispatch = useDispatch()
  const handleAddCart = useCallback(() => {
    dispatch(cartActions.addItem(id))
  }, [id, dispatch])

  return (
    <div className={styles.productOrder}>
      <button
        className={styles.productOrder__cartButton}
        onClick={handleAddCart}
      >
        + Add to Cart
      </button>
      <p className={styles.productOrder__price}>${price}</p>
    </div>
  )
}

const ProductHovered: FunctionComponent<TProductHoveredProps> = ({
  id,
  brandName,
  productName,
  price,
  onMouseLeave,
}) => {
  return (
    <div className={styles.productInfo} onMouseLeave={onMouseLeave}>
      <ProductTextSection brandName={brandName} productName={productName} />
      <ProductOrderSection id={id} price={price} />
    </div>
  )
}

const ProductImage: FunctionComponent<TProductImageProps> = ({
  productName,
  imageLink,
  onMouseEnter,
}) => (
  <img
    className={styles.product__image}
    src={imageLink}
    alt={productName}
    onMouseEnter={onMouseEnter}
  />
)

const Product: FunctionComponent<TProductProps> = ({
  id,
  brandName,
  productName,
  imageLink,
  price,
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleHover = useCallback(() => {
    setIsHovered(true)
  }, [setIsHovered])

  const handleUnhover = useCallback(() => {
    setIsHovered(false)
  }, [setIsHovered])

  return (
    <div className={styles.product}>
      <ProductImage
        imageLink={imageLink}
        productName={productName}
        onMouseEnter={handleHover}
      />
      {isHovered && (
        <ProductHovered
          id={id}
          brandName={brandName}
          productName={productName}
          price={price}
          onMouseLeave={handleUnhover}
        />
      )}
    </div>
  )
}

const ProductList = () => {
  const products = useAppSelector(productSelectors.selectAll)

  return (
    <div id="products-list" className={styles.productsList}>
      {products.map(
        ({ _id, itemLink, vendorName, vendorProductName, MSRP }) => (
          <Product
            key={_id}
            id={_id}
            imageLink={itemLink}
            productName={vendorProductName}
            brandName={vendorName}
            price={MSRP}
          />
        )
      )}
    </div>
  )
}

/**
 * In case there is network delay in fetching shop data, and data cannot be retrieved immediately,
 * render a more intuitive loading ui
 */
const ProductListWrapper = () => {
  const status = useAppSelector(selectProductStatus)

  return status === 'pending' ? <Loading /> : <ProductList />
}

/**
 * Shop content is a reusable component for a category page such as patio furniture
 * ! Currently, the background image is hardcoded to the one present on figma
 *
 * The component is made up of two sections:
 * - introductory page: contains a suitable image for the category, title, and navigation button
 * - product listings
 */
export const ShopContent: FunctionComponent<TShopContentProps> = ({ name }) => (
  <div className={styles.shopContentWrapper}>
    <div className={styles.shopContent}>
      <CategoryOverview name={name} />
      <ProductListWrapper />
    </div>
  </div>
)
