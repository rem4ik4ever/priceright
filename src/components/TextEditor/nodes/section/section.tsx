import { NodeViewContent, NodeViewRendererProps, NodeViewWrapper } from "@tiptap/react"
import { useCallback } from "react"
import clx from 'classnames'
import styles from './section.module.css'
import {MdClose, MdDragIndicator} from 'react-icons/md'

export const Section = (props: NodeViewRendererProps) => {
  const {editor, node, getPos } = props

  const handleAddSection = (top: boolean) => () => {
    if(typeof getPos === 'function') {
      const insertAt = getPos() + (top ? 0 : node.nodeSize)
      editor.chain().insertContentAt(insertAt, [{
        type: 'section',
        content: [{type: 'paragraph'}]
      }])
      .run();
    }
  }

  const destroy = () => {
    if(typeof getPos === 'function') {
      const pos = getPos()
      const end = pos + node.nodeSize
      editor.commands.deleteRange({from: pos, to: end})
    } 
  }

  return (
    <NodeViewWrapper 
      className={clx(styles.root)}
      >
      <div className={styles.topControls}
        draggable="true"
      >
        <div
          className={styles.dragHandle}
          contentEditable={false}
          draggable="true"
          data-drag-handle
        />
        <button 
          className={clx(styles.insertSectionButton)}
          type="button" 
          onClick={handleAddSection(true)}
          >
            + insert section 
        </button>
        <button type="button" onClick={destroy}><MdClose /></button>
      </div>
      <span>This is section</span>
      <NodeViewContent />
      <div className={styles.bottomControls}>
        <button 
          className={clx(styles.insertSectionButton)}
          type="button" 
          onClick={handleAddSection(false)}
          >
            + insert section 
        </button>
      </div>
    </NodeViewWrapper>
  )
}
