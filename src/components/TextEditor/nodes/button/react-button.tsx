import { NodeViewContent, NodeViewRendererProps, NodeViewWrapper } from "@tiptap/react"
import styles from './button.module.css'
import clx from 'classnames'
import { useMemo } from "react"

export interface ButtonProps {
  url: string
  label: string
}

export const Button = (props: NodeViewRendererProps) => {
  const {editor, node} = props;
  const {url, label, ...attrs} = node.attrs;

  const {editable} = editor.options

  const render = useMemo(() => {
    if(!editable){
      return (
        <a href={url}>
          <button type="button" className={styles.button}>
            <span>
              {label}
            </span>
          </button>
        </a>
      )     
    }
    return  (
      <button type="button" className={styles.button}>
        <span>{label}</span>
      </button>
    )
  }, [editable])

  return (
    <NodeViewWrapper className={clx(styles.root, styles[attrs.textAlign])} draggable="true" contentEditable={false}>
      {render}
    </NodeViewWrapper>
  )
}
