import { NodeViewProps, NodeViewWrapper, NodeViewWrapperProps } from "@tiptap/react"
import React, { useRef } from "react"
import { MdDragHandle } from "react-icons/md"
import styles from './spacer.module.css'
import clx from 'classnames'
import { useSpacer } from "src/hooks/useSpacer"

export const Spacer = ({ node, updateAttributes }: NodeViewProps) => {
  const ref = useRef<HTMLDivElement | null>(null)
  useSpacer(ref, (height: number) => updateAttributes({ height }))
  return (
    <NodeViewWrapper>
      <div
        ref={r => ref.current = r}
        className={clx(styles.root)}
        style={{
          height: node.attrs.height
        }}>
        <div className={styles.handlerContainer}>
          <MdDragHandle className={styles.handler} />
        </div>
      </div>
    </NodeViewWrapper >
  )
}
