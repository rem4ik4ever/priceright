import { NodeViewContent, NodeViewRendererProps, NodeViewWrapper } from "@tiptap/react"
import styles from './columns.module.css'
import clx from 'classnames'
import { useEffect, useMemo } from "react"
import { TextEditor } from "@components/TextEditor/TextEditor.component"

export interface ButtonProps {
  url: string
  label: string
}

export const FlexRow = (props: NodeViewRendererProps) => {
  const {editor, node} = props;
  const {columns, ...attrs} = node.attrs;
  return (
    <NodeViewWrapper className={clx(styles[attrs.textAlign])}>
      <NodeViewContent className={clx(styles.root)}></NodeViewContent>
    </NodeViewWrapper>
  )
}
