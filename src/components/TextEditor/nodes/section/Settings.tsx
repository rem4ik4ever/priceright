import { MdSettings } from 'react-icons/md'
import {
  offset,
  flip,
  shift,
  autoUpdate,
} from '@floating-ui/react-dom';
import { useClick, useDismiss, useFloating, useInteractions, useRole } from '@floating-ui/react-dom-interactions'
import { NodeViewProps } from '@tiptap/react';
import { useState } from 'react';
import styles from './section.module.css'

interface Props {
  editor: NodeViewProps['editor'];
  node: NodeViewProps['node'];
  updateAttributes: NodeViewProps['updateAttributes']
}
export const SectionSettings = ({ editor, node, updateAttributes }: Props) => {
  const [open, setOpen] = useState(false)
  const { x, y, reference, floating, strategy, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: 'bottom',
    strategy: 'absolute',
    middleware: [offset(10), flip(), shift()],
    whileElementsMounted: (reference, floating, update) =>
      autoUpdate(reference, floating, update, {
        animationFrame: true,
      }),
  });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useRole(context),
    useDismiss(context)

  ])
  return (
    <>
      <button
        className={styles.settingsBtn}
        type="button"
        {...getReferenceProps({ ref: reference })}
      >
        <MdSettings className={styles.icon} />
      </button>
      {open && (
        <div
          className="bg-primary border rounded-md p-3 w-64"
          {...getFloatingProps({ ref: floating })}
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
            zIndex: 9999
          }}
        >
          <span className="text-lg text-semibold">Section settings</span>
          <div className="flex flex-row items-center justify-between">
            <label className="text-xs text-semibold">Background colour</label>
            <input type="color" value={node.attrs.backgroundColor} onInput={(event) => {
              updateAttributes({ backgroundColor: (event.target as HTMLInputElement).value })
            }} />
          </div>
          <div className="flex flex-row items-center justify-between">
            <label className="text-xs text-semibold">Padding</label>
          </div>
        </div>
      )}
    </>
  )
}
