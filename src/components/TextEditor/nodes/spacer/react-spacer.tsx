import { Editor, NodeViewProps, NodeViewWrapper, NodeViewWrapperProps } from "@tiptap/react"
import { nodeHTTPRequestHandler } from "@trpc/server/dist/declarations/src/adapters/node-http"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { MdDragHandle } from "react-icons/md"
import styles from './spacer.module.css'
import clx from 'classnames'

const useSpacer = (elmRef: React.MutableRefObject<HTMLDivElement | null>, update: (val: number) => void) => {
  const [dragging, setDragging] = useState(false)
  const [dragStart, setDragStart] = useState<number>(-1)
  const handlePointDown = useCallback((e: MouseEvent) => {
    e.preventDefault()
    setDragging(true)
    setDragStart(e.clientY)
    console.log('down')
  }, [])

  const handlePointUp = useCallback((e: Event) => {
    e.preventDefault()
    console.log('up')
    setDragging(false)
  }, [])

  const handlePointMove = useCallback((e: MouseEvent) => {
    if (dragging) {
      e.preventDefault()
      console.log('move', dragging)
      console.log(e)
      update(e.clientY - dragStart)
    }
  }, [dragging, dragStart])

  useEffect(() => {
    console.log({ dragging })
  }, [dragging])

  useEffect(() => {
    const elm = elmRef.current;
    if (elm) {
      elm.addEventListener('pointerdown', handlePointDown)
      window.addEventListener('pointerup', handlePointUp)
      window.addEventListener('pointermove', handlePointMove)

      return () => {
        elm.removeEventListener('pointerdown', handlePointDown)
        window.removeEventListener('pointerup', handlePointUp)
        window.removeEventListener('pointermove', handlePointMove)
      }
    }
    return () => { }

  }, [elmRef, handlePointMove])

  return { isDragging: dragging }
}

export const Spacer = ({ node, updateAttributes }: NodeViewProps) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const onChange = (val: number) => {
    const newHeight = node.attrs.height + val;
    let height = Math.min(newHeight, node.attrs.maxHeight)
    height = Math.max(height, node.attrs.minHeight)
    updateAttributes({ height })
  }
  const { isDragging } = useSpacer(ref, onChange)

  console.log({ node })
  return (
    <NodeViewWrapper
      className={clx(styles.root, isDragging && styles.active)}
      style={{
        height: node.attrs.height
      }}>
      <div ref={(r) => ref.current = r} className={styles.handlerContainer}>
        <MdDragHandle className={styles.handler} />
      </div>
    </NodeViewWrapper>
  )
}
