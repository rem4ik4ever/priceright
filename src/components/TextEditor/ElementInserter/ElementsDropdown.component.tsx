import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import styles from './ElementsDropdown.module.css'

interface Props {
  open: boolean;
  onSelect: (item: string) => void;
}
export const ElementsDropdown = ({ open, onSelect }: Props) => {
  const items = [
    'heading 1',
    'heading 2',
    'heading 3',
    'heading 3',
    'heading 3',
    'heading 3',
    'heading 3',
    'heading 3',
    'heading 3',
  ]


  return (
    <div className={styles.root}>
      <Menu as="div">
        <Transition
          as={Fragment}
          show={open}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items>
            <div className={styles.itemsContainer}>
              {items.map((item) => (
                <Menu.Item as="button" onClick={() => onSelect(item)} key={item} className={styles.item}>{item}</Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
