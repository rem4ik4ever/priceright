import { NodeViewContent, NodeViewRendererProps, NodeViewWrapper } from "@tiptap/react"
import { useCallback, useEffect, useMemo } from "react"
import clx from 'classnames'
import styles from './section.module.css'
import { MdClose, MdDragIndicator } from 'react-icons/md'
import { useBuilder } from "@components/PageBuilder/context"

export const Section = (props: NodeViewRendererProps) => {
  const { editor, node, getPos } = props

  const hasAnchor = () => {
    if (typeof getPos !== 'function') return false;

    const anchor = editor.state.selection.anchor
    const pos = getPos();
    const result = anchor >= pos && anchor <= (pos + node.nodeSize) && editor.isFocused
    return result;
  }

  const handleAddSection = (top: boolean) => () => {
    if (typeof getPos === 'function') {
      const insertAt = getPos() + (top ? 0 : node.nodeSize)
      editor.chain().insertContentAt(insertAt, [{
        type: 'section',
        content: [{ type: 'paragraph' }]
      }])
        .run();
    }
  }

  const destroy = () => {
    if (typeof getPos === 'function') {
      const pos = getPos()
      const end = pos + node.nodeSize
      editor.commands.deleteRange({ from: pos, to: end })
    }
  }

  return (
    <NodeViewWrapper
      className={clx(styles.root, hasAnchor() && styles.focused)}
    >
      <div className={styles.topControls}
        draggable="true"
      >
        <div
          className={clx(styles.dragHandle, styles.controlButton)}
          contentEditable={false}
          draggable="true"
          data-drag-handle
        >
          <MdDragIndicator className="w-4 h-4" />
        </div>
        <button
          className={clx(styles.insertSectionButton)}
          type="button"
          onClick={handleAddSection(true)}
        >
          + insert section
        </button>
        <button
          type="button"
          onClick={destroy}
          className={clx(styles.closeIcon, styles.controlButton)}
        ><MdClose className="w-4 h-4" /></button>
      </div>
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
