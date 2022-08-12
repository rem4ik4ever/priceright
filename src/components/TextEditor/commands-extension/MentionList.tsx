
import React, {
  forwardRef, useEffect, useImperativeHandle,
  useState,
} from 'react'
import { SuggestionProps } from "@tiptap/suggestion";
import styles from '../ElementInserter/ElementsDropdown.module.css'
import clx from 'classnames'

export type MentionListProps = Pick<SuggestionProps, "items" | "command">;

export type MentionListRef = {
  onKeyDown: (props: { event: KeyboardEvent }) => boolean
}

// eslint-disable-next-line react/display-name
export const MentionList = forwardRef<MentionListRef, MentionListProps>((props, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const selectItem = (index: number) => {
    const item = props.items[index]

    if (item) {
      props.command({ id: item })
    }
  }

  const upHandler = () => {
    setSelectedIndex((selectedIndex + props.items.length - 1) % props.items.length)
  }

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length)
  }

  const enterHandler = () => {
    selectItem(selectedIndex)
  }

  useEffect(() => setSelectedIndex(0), [props.items])

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }) => {
      if (event.key === 'ArrowUp') {
        upHandler()
        return true
      }

      if (event.key === 'ArrowDown') {
        downHandler()
        return true
      }

      if (event.key === 'Enter') {
        enterHandler()
        return true
      }

      return false
    },
  }))

  return (
    <div className={styles.root}>
      <ul className={styles.itemsContainer}>
        {props.items.length ? 
          props.items.map((item, index) => (
          <li key={item.title} className={clx(styles.item, index === selectedIndex && styles.isSelected)}>
            <button onClick={() => selectItem(index)} key={item.title}>{item.title}</button>
          </li>
        )) : 
        <div className={styles.item}>No result</div>}
      </ul>
    </div>
  )
})
