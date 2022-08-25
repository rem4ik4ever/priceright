import { MdClose, MdSettings } from 'react-icons/md'
import {
  offset,
  flip,
  shift,
  autoUpdate,
} from '@floating-ui/react-dom';
import { useClick, useDismiss, useFloating, useInteractions, useRole } from '@floating-ui/react-dom-interactions'
import { NodeViewProps } from '@tiptap/react';
import { useState } from 'react';
import styles from '../section.module.css'
import { Dialog } from '@components/Dialog';
import { ColorSelector } from './ColorSelector';
import { SpacingInputs } from './SpacingInputs';

interface Props {
  editor: NodeViewProps['editor'];
  node: NodeViewProps['node'];
  updateAttributes: NodeViewProps['updateAttributes'],
  open: boolean,
  setOpen: (o: boolean) => void
}

export const SectionSettings = ({ editor, node, updateAttributes, open, setOpen }: Props) => {
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(!open)
      }}
      onClose={() => setOpen(false)}
      render={({ close, labelId, descriptionId }) => (
        <>
          <span id={labelId} className="text-lg text-semibold">Section settings</span>
          <div className='grid gap-1'>
            <ColorSelector label="Background Color" value={node.attrs.backgroundColor} onUpdate={backgroundColor => updateAttributes({ backgroundColor })} />
            <ColorSelector label="Text Color" value={node.attrs.color} onUpdate={color => updateAttributes({ color })} />
            <SpacingInputs label="Padding" value={[node.attrs.paddingTop, node.attrs.paddingRight, node.attrs.paddingBottom, node.attrs.paddingLeft]} onUpdate={(dir, spacing) => {
              switch (dir) {
                case 'top':
                  return updateAttributes({ paddingTop: spacing })
                case 'bottom':
                  return updateAttributes({ paddingBottom: spacing })
                case 'left':
                  return updateAttributes({ paddingLeft: spacing })
                case 'right':
                  return updateAttributes({ paddingRight: spacing })
                case 'x':
                  return updateAttributes({ paddingTop: spacing, paddingBottom: spacing })
                case 'y':
                  return updateAttributes({ paddingLeft: spacing, paddingRight: spacing })
              }
            }} />

            <SpacingInputs label="Margin" value={[node.attrs.marginTop, node.attrs.marginRight, node.attrs.marginBottom, node.attrs.marginLeft]} onUpdate={(dir, spacing) => {
              switch (dir) {
                case 'top':
                  return updateAttributes({ marginTop: spacing })
                case 'bottom':
                  return updateAttributes({ marginBottom: spacing })
                case 'left':
                  return updateAttributes({ marginLeft: spacing })
                case 'right':
                  return updateAttributes({ marginRight: spacing })
                case 'x':
                  return updateAttributes({ marginTop: spacing, marginBottom: spacing })
                case 'y':
                  return updateAttributes({ marginLeft: spacing, marginRight: spacing })
              }
            }} />
          </div>
        </>
      )}
    >
      <button
        className={styles.settingsBtn}
        type="button"
        onClick={() => setOpen(!open)}
      >
        <MdSettings className={styles.icon} />
      </button>
    </Dialog>
  )
}
