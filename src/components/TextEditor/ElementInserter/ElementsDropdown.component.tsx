import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect } from 'react'
import { useHotkeys } from 'react-hotkeys-hook';
import styles from './ElementsDropdown.module.css'

interface Props {
  //open: boolean;
  onSelect: (item: string) => void;
}
export const ElementsDropdown = ({ onSelect }: Props) => {
  const items = [
    'Heading 1',
    'Heading 2',
    'Heading 3',
    'Heading 4',
    'Heading 5',
    'Heading 6',
    'Ordered list',
    'Bullet list',
    'Paragraph',
    'Button',
    'Code block',
  ]

  const handleKeys = (event: KeyboardEvent) => {
    if(event.key === 'ArrowDown'){
      event.preventDefault()
      console.log("down")
    } else if(event.key === 'ArrowUp') {
      event.preventDefault()
    }

  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeys)
    return () => {
      document.removeEventListener('keydown', handleKeys)
    }
  }, [])

  //useHotkeys('down', () => console.log("DOWN"), {filter: (event) => {
  //  console.log({event})
  //  return false;
  //}})
  //useHotkeys('up', () => console.log("up"), {filter: (event) => {
  //  console.log({event})
  //  return false;
  //}})

  return (
    <div className={styles.root}>

    <ul className={styles.itemsContainer}>
      {items.map((item) => (
        <li key={item} className={styles.item}>
          <button onClick={() => onSelect(item)} key={item}>{item}</button>
        </li>
      ))}
    </ul>
      </div>
  )

  return (
    <div className={styles.root}>
      <Menu as="div">
        {/*<Transition
          as={Fragment}
          show={open}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >*/}
          <Menu.Items>
            <div className={styles.itemsContainer}>
              {items.map((item) => (
                <Menu.Item as="button" onClick={() => onSelect(item)} key={item} className={styles.item}>{item}</Menu.Item>
              ))}
            </div>
          </Menu.Items>
        {/*</Transition>*/}
      </Menu>
    </div>
  )
}
