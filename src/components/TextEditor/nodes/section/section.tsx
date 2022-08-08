import { NodeViewContent, NodeViewRendererProps, NodeViewWrapper } from "@tiptap/react"
import { useCallback } from "react"
import clx from 'classnames'
import styles from './section.module.css'

export const Section = (props: NodeViewRendererProps) => {
  const {editor, node, getPos} = props
  const handleAddSection = useCallback(() => {
    if(typeof getPos === 'function') {
      const insertAt = getPos() + node.nodeSize
      console.log({insertAt})
      editor.chain().focus('end').insertContentAt(insertAt, [{
        type: 'section',
        content: [{type: 'paragraph'}]
      }])
      .run();
    }
  }, [getPos, node, editor])

  return (
    <NodeViewWrapper 
      className={clx(styles.root)}
      >

      <div className={styles.topControls}>
        <button 
          className={clx(styles.insertSectionButton)}
          type="button" 
          onClick={handleAddSection}
          >
            + insert section 
        </button>
      </div>
      <span contentEditable="false">This is section</span>
      <NodeViewContent />
      <div className={styles.bottomControls}>
        <button 
          className={clx(styles.insertSectionButton)}
          type="button" 
          onClick={handleAddSection}
          >
            + insert section 
        </button>
      </div>
    </NodeViewWrapper>
  )
}
