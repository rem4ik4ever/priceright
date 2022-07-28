import { useEditor, EditorContent, BubbleMenu, Editor, EditorEvents, HTMLContent } from '@tiptap/react'
import Document from '@tiptap/extension-document'
import { Typography } from '@tiptap/extension-typography'
import Placeholder from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'
import editorStyles from './TextEditor.module.css'
import clx from 'classnames'
import { ElementInserter } from './ElementInserter'
import { Menu } from './Menu'
import { MutableRefObject, useEffect, useRef } from 'react'
import { PageBlock } from '@components/PageBuilder/types'
import { useBuilder } from '@components/PageBuilder/context'

//const CustomDocument = Document.extend({
//  content: 'heading block*',
//})

interface Props {
  id: string;
  index: number;
  content: string | undefined;
  onEnter: (id: string) => void
  onDelete: (id: string) => void
  onUp?: () => void;
  onDown?: () => void;
  onFocus?: (id: string, props?: EditorEvents['focus']) => void;
  onUpdate?: (id: string, props?: EditorEvents['update']) => void;
  onUndo?: () => void,
  onRedo?: () => void,
  setNodeRef: (ref: MutableRefObject<PageBlock>) => void
  preview: boolean
}
export const TextEditor = ({
  id,
  index, 
  content, 
  onEnter, 
  onDelete, 
  onUpdate, 
  onUp, 
  onDown, 
  onFocus, 
  onUndo,
  onRedo,
  setNodeRef, 
  preview 
}: Props) => {
  const ref = useRef<PageBlock>()
  const editor = useEditor({
    editable: !preview,
    onFocus: (props) => onFocus && onFocus(id, props),
    onUpdate: (props) => onUpdate && onUpdate(id, props),
    extensions: [
      StarterKit.configure({ document: false }),
      Typography,
      Document.extend({
        addKeyboardShortcuts() {
          return {
            Enter: () => {
              const lastNodeType = this.editor.state.doc.lastChild?.type.name
              console.log({editor: this.editor.state.tr})
              if(lastNodeType?.toLocaleLowerCase()?.includes('list')){
                // trigger add new editor with bulletList
                //return false;
              }
              this.editor.commands.blur();
              onEnter(id)
              return true;
            },
            Backspace: () => {
              if (this.editor.getText().length === 0 && index !== 0) {
                this.editor.commands.clearContent()
                this.editor.commands.clearNodes()
                this.editor.destroy();
                onDelete(id)
                return true;
              } else {
                return false;
              }
            },
            ArrowUp: () => {
              if (!this.editor.state.selection.$anchor.nodeBefore) {
                onUp && onUp()
                return true;
              }
              return false
            },
            ArrowDown: () => {
              if (!this.editor.state.selection.$anchor.nodeAfter) {
                onDown && onDown()
                return true;
              }
              return false;
            },
            //'Mod-z': () => {
            //  console.log(this.editor)
            //  if(onUndo) {
            //    onUndo()
            //    return true;
            //  }
            //  return false
            //},
            //'Mod-Shift-z': () => {
            //  if(onRedo) {
            //    onRedo()
            //    return true;
            //  }
            //  return false
            //}
          }
        },
      }),
      Placeholder.configure({
        placeholder: ({ node, editor }) => {
          if (editor.isFocused) {
            if (node.type.name === 'heading') {
              return 'Add heading'
            }
            return 'Insert elements by typing "/"'
          }
          return ''
        },
      }),
    ],
    content: content || '',
    editorProps: {
      attributes: {
        class: editorStyles.root as string,
      }
    },
  }, [])

  useEffect(() => {
    if (editor) {
      editor?.commands.focus('end');
      ref.current = { id, editor }
      setNodeRef(ref as MutableRefObject<PageBlock>)
    }
  }, [editor])

  useEffect(() => {
    if (!editor) {
      return undefined
    }

    editor.setEditable(!preview)
  }, [editor, preview])

  return (
    <>
      <Menu editor={editor} />
      <EditorContent className={editorStyles.root} editor={editor} />
      {editor && <ElementInserter  editor={editor} tippyOptions={{duration: 100}} /> }
    </>
  )
}
