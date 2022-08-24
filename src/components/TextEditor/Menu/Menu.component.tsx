import { BubbleMenu, Editor, Node } from "@tiptap/react"
import clx from 'classnames'
import styles from './Menu.module.css'
import { useState } from "react";
import { MdFormatBold, MdFormatItalic, MdFormatStrikethrough, MdFormatAlignLeft, MdFormatAlignRight, MdFormatAlignCenter, MdFormatQuote, MdFormatSize, MdFormatLineSpacing, MdFormatColorText } from 'react-icons/md'
import { Tooltip } from "@components/Tooltip";

interface Props {
  editor: Editor | null
}
export const Menu = ({ editor }: Props) => {
  if (!editor) {
    return null;
  }
  const { node } = editor.state.selection as any;
  return (
    <BubbleMenu className={styles.root} editor={editor} tippyOptions={{ duration: 100, maxWidth: '600px' }}>
      {editor.isEditable && (
        <div className="flex flex-wrap items-center">
          {!node && (<>
            <Tooltip label="Bold">
              <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={clx(editor.isActive('bold') ? styles.active : '', styles.item)}
              >
                <MdFormatBold />
              </button>
            </Tooltip>
            <Tooltip label="Italic">
              <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={clx(editor.isActive('italic') ? styles.active : '', styles.item)}
              >
                <MdFormatItalic />
              </button>
            </Tooltip>
            <Tooltip label="Strike">

              <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={clx(editor.isActive('strike') ? styles.active : '', styles.item)}
              >
                <MdFormatStrikethrough />
              </button>
            </Tooltip>
            <Tooltip label="Align Left">

              <button
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                className={clx(editor.isActive('left') ? styles.active : '', styles.item)}
              >
                <MdFormatAlignLeft />
              </button>
            </Tooltip>
            <Tooltip label="Align Center">

              <button
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                className={clx(editor.isActive('center') ? styles.active : '', styles.item)}
              >
                <MdFormatAlignCenter />
              </button>
            </Tooltip>
            <Tooltip label="Algin Right">

              <button
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                className={clx(editor.isActive('right') ? styles.active : '', styles.item)}
              >
                <MdFormatAlignRight />
              </button>
            </Tooltip>
            <Tooltip label="Blockquote">

              <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={clx(editor.isActive('blockquote') ? styles.active : '', styles.item)}
              >
                <MdFormatQuote />
              </button>
            </Tooltip>
            <Tooltip label="Color">

              <button
                className={clx(styles.item)}
              >
                <div className="flex items-center">
                  <label htmlFor="textColor"><MdFormatColorText style={{ color: editor.getAttributes('textStyle').color }} /></label>
                  <input
                    id="textColor"
                    className="w-6 opacity-0 absolute"
                    type="color"
                    onInput={event => editor.chain().focus().setColor((event.target as HTMLInputElement).value).run()}
                    value={editor.getAttributes('textStyle').color}
                  />
                </div>
              </button>
            </Tooltip>
            <Tooltip label="Font Size">

              <button
                className={clx(styles.item)}
              >

                <div className="flex items-center gap-1">
                  <label htmlFor="fontSize"><MdFormatSize /></label>
                  <select
                    id="fontSize"
                    className="w-18 text-sm"
                    value={parseFloat(editor.getAttributes('textStyle').fontSize) || 0.5}
                    onChange={(e) => {
                      e.preventDefault()
                      editor.chain().focus().setFontSize(+e.target.value).run()
                    }}>
                    <option value={0.5}>0.5rem</option>
                    <option value={1.0}>1.0rem</option>
                    <option value={1.5}>1.5rem</option>
                    <option value={2.0}>2.0rem</option>
                    <option value={2.5}>2.5rem</option>
                    <option value={3.0}>3.0rem</option>
                    <option value={3.5}>3.5rem</option>
                    <option value={4.0}>4.0rem</option>
                  </select>
                </div>
              </button>
            </Tooltip>
            <Tooltip label="Line Height">

              <button
                className={clx(styles.item)}
              >

                <div className="flex items-center gap-1">
                  <label htmlFor="lineHeight"><MdFormatLineSpacing /></label>
                  <select
                    id="lineHeight"
                    className="w-18 text-sm"
                    value={parseFloat(editor.getAttributes('textStyle').lineHeight) || 0.5}
                    onChange={(e) => {
                      e.preventDefault()
                      editor.chain().focus().setLineHeight(+e.target.value).run()
                    }
                    }>
                    <option value={0.5}>0.5rem</option>
                    <option value={1.0}>1.0rem</option>
                    <option value={1.5}>1.5rem</option>
                    <option value={2.0}>2.0rem</option>
                    <option value={2.5}>2.5rem</option>
                    <option value={3.0}>3.0rem</option>
                    <option value={3.5}>3.5rem</option>
                    <option value={4.0}>4.0rem</option>
                  </select>
                </div>
              </button>
            </Tooltip>
          </>)}
          {node && (
            <button type="button" onClick={() => editor.commands.deleteRange(editor.state.selection)}>remove</button>
          )}
        </div>
      )}
    </BubbleMenu>
  )
}
