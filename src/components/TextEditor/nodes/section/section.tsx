import { NodeViewContent, NodeViewProps, NodeViewRendererProps, NodeViewWrapper } from "@tiptap/react"
import { useEffect, useMemo, useRef, useState } from "react"
import clx from 'classnames'
import styles from './section.module.css'
import { MdAdd, MdClose, MdDragIndicator } from 'react-icons/md'
import { useResize } from 'src/hooks/useResize'
import { SectionSettings } from "./Settings/Settings"
import { autoUpdate, offset, shift, useFloating, useHover, useInteractions } from "@floating-ui/react-dom-interactions"

export const Section = (props: NodeViewProps) => {
  const { editor, node, getPos, updateAttributes } = props
  const [isFocused, setFocused] = useState(false)
  const [openSettings, setOpenSettings] = useState(false)
  const [pos, setPos] = useState<number>(-1)
  const { anchor } = editor.state.selection
  const ref = useRef<HTMLDivElement | null>(null)
  useResize({ target: ref, editor: editor as any, onUpdate: (width) => props.updateAttributes({ width }) })
  const { strategy, floating, reference, x, y, context } = useFloating({
    placement: 'left',
    strategy: 'absolute',
    middleware: [offset(1), shift()],
    whileElementsMounted: (reference, floating, update) =>
      autoUpdate(reference, floating, update, {
        animationFrame: true,
      }),
  })
  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, {
      enabled: true,
      delay: {
        open: 200,
        close: 0
      }
    })
  ])

  useEffect(() => {
    const timer = setInterval(() => {
      setFocused(editor.isFocused)
      setPos(getPos())
    }, 250)
    return () => clearInterval(timer)
  }, [getPos, editor])

  const hasAnchor = anchor >= pos && anchor <= (pos + node.nodeSize) && isFocused

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
    <NodeViewWrapper>
      <div {...getReferenceProps({
        ref: reference,
        className: styles.root,
        style: {
          width: '100%',
          backgroundColor: node.attrs.backgroundColor,
          color: node.attrs.color,

          boxShadow: openSettings ? `inset ${node.attrs.marginLeft}rem ${node.attrs.marginTop}rem 0 0px #F9CC9D, inset -${node.attrs.marginRight}rem -${node.attrs.marginBottom}rem 0 0 #F9CC9D` : 'none'
        }
      })}>
        <div
          {...getFloatingProps({ ref: floating })}
          className={clx(styles.dragHandle)}
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
          }}
          contentEditable={false}
          draggable="true"
          data-drag-handle
        >
          <MdDragIndicator className={styles.icon} />
        </div>
        <div
          ref={(r) => ref.current = r}
          className={clx('resizable-section', styles.content, (hasAnchor || openSettings) && styles.focused)}
          style={{
            width: node.attrs.width,
            paddingTop: `${node.attrs.paddingTop}rem`,
            paddingBottom: `${node.attrs.paddingBottom}rem`,
            paddingLeft: `${node.attrs.paddingLeft}rem`,
            paddingRight: `${node.attrs.paddingRight}rem`,

            marginTop: `${node.attrs.marginTop}rem`,
            marginBottom: `${node.attrs.marginBottom}rem`,
            marginLeft: `${node.attrs.marginLeft}rem`,
            marginRight: `${node.attrs.marginRight}rem`,

            boxShadow: openSettings ? `inset ${node.attrs.paddingLeft}rem ${node.attrs.paddingTop}rem 0 0px #C3DEB7, inset -${node.attrs.paddingRight}rem -${node.attrs.paddingBottom}rem 0 0 #C3DEB7` : 'none'
          }}

        >
          <div className={clx(hasAnchor ? styles.topControls : 'hidden')}
          >
            <div className={styles.controls}>
              <button
                className={clx(styles.settingsBtn)}
                type="button"
                onClick={handleAddSection(true)}
              >
                <MdAdd className={styles.icon} />
              </button>
              <SectionSettings
                editor={editor}
                node={node}
                updateAttributes={updateAttributes}
                open={openSettings}
                setOpen={setOpenSettings}
              />
              <button
                type="button"
                onClick={destroy}
                className={clx(styles.settingsBtn)}
              ><MdClose className={styles.icon} /></button>
            </div>
          </div>
          <NodeViewContent />
          <div className={clx(styles.bottomControls, hasAnchor && 'z-10')}>
            <div className={styles.controls}>
              <button
                className={clx(styles.settingsBtn)}
                type="button"
                onClick={handleAddSection(false)}
              >
                <MdAdd className={styles.icon} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </NodeViewWrapper>
  )
}
