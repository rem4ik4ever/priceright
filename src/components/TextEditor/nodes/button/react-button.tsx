import { NodeViewContent, NodeViewRendererProps, NodeViewWrapper } from "@tiptap/react"
import styles from './button.module.css'

export interface ButtonProps {
  url: string
  label: string
}

export const Button = (props: NodeViewRendererProps) => {
  const {editor, node} = props;
  const {url, label} = node.attrs;

  const {editable} = editor.options
  console.log({editable})

  if(!editable) {
    <NodeViewWrapper className={styles.root}>
      <a href={url}>
        <button type="button" className={styles.button}>
          {label}
        </button>
      </a>
    </NodeViewWrapper>
  }

  return (
    <NodeViewWrapper className={styles.root}>
      <button type="button" className={styles.button}>
        {label}
      </button>
    </NodeViewWrapper>
  )
}
