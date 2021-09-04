import { MouseEvent, FunctionComponent, CSSProperties } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import styles from './button.module.scss'

type TButtonProps = {
  name?: string
  onClick?: (event: MouseEvent) => void
  style?: CSSProperties
}

export const BlackButton: FunctionComponent<TButtonProps> = ({
  name,
  onClick,
  style,
  children,
}) => (
  <button
    style={style}
    className={`${styles.button} ${styles.button__black}`}
    onClick={onClick}
  >
    {name || children}
  </button>
)

export const CloseButton: FunctionComponent<TButtonProps> = ({ onClick }) => (
  <button
    className={`${styles.button} ${styles.button__close}`}
    onClick={onClick}
  >
    <AiOutlineClose />
  </button>
)
