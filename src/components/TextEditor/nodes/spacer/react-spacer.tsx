import { NodeViewProps, NodeViewWrapper, NodeViewWrapperProps } from "@tiptap/react"
import React from "react"
import { MdDragHandle } from "react-icons/md"
import styles from './spacer.module.css'
import clx from 'classnames'
import { useSpacer } from "src/hooks/useSpacer"

export const Spacer = ({ node, updateAttributes }: NodeViewProps) => {
  useSpacer('.resizable', (height: number) => updateAttributes({ height }))
  return (
    <NodeViewWrapper
      className={clx(styles.root, 'resizable')}
      style={{
        height: node.attrs.height
      }}>
      <div className={styles.handlerContainer}>
        <MdDragHandle className={styles.handler} />
      </div>
    </NodeViewWrapper>
  )
}
