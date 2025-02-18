import { FC } from 'react'
import { createPortal } from 'react-dom'
import { usePortal } from '../../Hooks/use-portal'
export const Portal: FC = ({ children }) => {
  const target = usePortal()
  return createPortal(children, target)
}
