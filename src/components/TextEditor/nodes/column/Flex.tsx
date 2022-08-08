import { NodeViewContent, NodeViewRendererProps, NodeViewWrapper } from "@tiptap/react"
import styles from './column.module.css'
import clx from 'classnames'
import { useEffect, useMemo } from "react";

export const Flex = (props: NodeViewRendererProps) => {
  const {editor, node, getPos } = props;
  const {selection} = editor.state;
  const {anchor} = selection;
  const {columns, ...attrs} = node.attrs;

  const hasAnchor = useMemo(() => {
    if(typeof getPos === 'function'){
      const pos = getPos()
      return anchor >= pos && anchor <= (pos + node.nodeSize)
    }
    return false
  }, [anchor, node, getPos])
  console.log({hasAnchor})

  return (
    <NodeViewWrapper className={clx(styles.wrapper, styles[attrs.textAlign])}>
      <NodeViewContent className={styles.content} />
    </NodeViewWrapper>
  )
}
