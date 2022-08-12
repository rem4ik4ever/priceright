import { NodeViewContent, NodeViewRendererProps, NodeViewWrapper } from "@tiptap/react"
import styles from './column.module.css'
import clx from 'classnames'

export const Flex = (props: NodeViewRendererProps) => {
  const {editor, node, getPos } = props;
  const {selection} = editor.state;
  const {anchor} = selection;
  const {columns, ...attrs} = node.attrs;

  return (
    <NodeViewWrapper className={clx(styles.wrapper, styles[attrs.textAlign])}>
      <NodeViewContent className={styles.content} />
    </NodeViewWrapper>
  )
}
