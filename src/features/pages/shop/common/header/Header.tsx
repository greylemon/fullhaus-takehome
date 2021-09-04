import { CartButton } from '../cart/Cart'
import styles from './Header.module.scss'

const Title = () => <p className={styles.headerContent__text}>Fülhaus Shop</p>

/**
 * Header for a shop page
 *
 * Contains the title, Fullhaus Shop and navigation, such as cart
 */
export const Header = () => (
  <div className={styles.header}>
    <div className={styles.headerContent}>
      <Title />
      <CartButton />
    </div>
  </div>
)
