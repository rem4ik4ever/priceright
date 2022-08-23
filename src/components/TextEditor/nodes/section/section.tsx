import { NodeViewContent, NodeViewProps, NodeViewRendererProps, NodeViewWrapper } from "@tiptap/react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import clx from 'classnames'
import styles from './section.module.css'
import { MdClose, MdDragIndicator } from 'react-icons/md'
import { useBuilder } from "@components/PageBuilder/context"
import { useResize } from 'src/hooks/useResize'
import ExamplePopover from "./popover"

export const Section = (props: NodeViewProps) => {
  const { editor, node, getPos } = props
  const [isFocused, setFocused] = useState(false)
  const [pos, setPos] = useState<number>(-1)
  const { anchor } = editor.state.selection
  const ref = useRef<HTMLDivElement | null>(null)
  useResize({ target: ref, editor: editor as any, onUpdate: (width) => props.updateAttributes({ width }) })

  useEffect(() => {
    const timer = setInterval(() => {
      setFocused(editor.isFocused)
      setPos(getPos())
    }, 250)
    return () => clearInterval(timer)
  }, [getPos, editor])

  const hasAnchor = useMemo(() => (anchor >= pos && anchor <= (pos + node.nodeSize) && isFocused
  ), [pos, node, isFocused, anchor])

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
    <NodeViewWrapper className={styles.root}>
      <div
        ref={(r) => ref.current = r}
        className={clx('resizable-section', styles.container, hasAnchor && styles.focused)}
        style={{
          width: node.attrs.width,
          backgroundColor: node.attrs.backgroundColor
        }}
      >

        <div className={styles.topControls}
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
          <ExamplePopover />
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
      </div>
    </NodeViewWrapper>
  )
}
