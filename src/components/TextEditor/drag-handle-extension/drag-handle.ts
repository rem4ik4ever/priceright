import { Editor, Extension } from '@tiptap/core'
import { Node as ProsemirrorNode } from 'prosemirror-model'
import { Plugin } from 'prosemirror-state'
import { Decoration, DecorationSet } from 'prosemirror-view'

export interface DragHandleOptions {
  draggableNodeClass: string,
  draghandle: ((DragHandleProps: {
    editor: Editor,
    node: ProsemirrorNode,
    pos: number,
    hasAnchor: boolean,
  }) => string) | string,
  showOnlyWhenDraggable: boolean,
  showOnlyCurrent: boolean,
  includeChildren: boolean,
}

function renderDragHandle(className: string) {
  const handler = document.createElement('div')

  handler.className = className
  handler.setAttribute('data-drag-handle', '')

  return handler
}

export const DragHandle = Extension.create<DragHandleOptions>({
  name: 'draghandle',

  draggable: true,

  addOptions() {
    return {
      draggableNodeClass: 'is-draggable',
      draghandle: '',
      showOnlyWhenDraggable: true,
      showOnlyCurrent: true,
      includeChildren: false,
    }
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          decorations: ({ doc, selection }) => {
            const active = this.editor.isEditable || !this.options.showOnlyWhenDraggable
            const { anchor } = selection
            const decorations: Decoration[] = []

            if (!active) {
              return null
            }

            doc.descendants((node, pos) => {
              const hasAnchor = anchor >= pos && anchor <= (pos + node.nodeSize)
              const isEmpty = !node.isLeaf && !node.childCount
              if ((hasAnchor || !this.options.showOnlyCurrent) && !isEmpty) {
                const classes = [this.options.draggableNodeClass]

                //if (this.editor.isEmpty) {
                //  classes.push(this.options.emptyEditorClass)
                //}

                const widget = Decoration.widget(pos + 1, renderDragHandle(this.options.draggableNodeClass))
                const decoration = Decoration.node(pos, pos + node.nodeSize, {
                  class: classes.join(' '),
                  //'data-drag-handle': typeof this.options.draghandle === 'function'
                  //  ? this.options.draghandle({
                  //    editor: this.editor,
                  //    node,
                  //    pos,
                  //    hasAnchor,
                  //  })
                  //  : this.options.draghandle,
                })

                decorations.push(widget)
                //decorations.push(decoration)
              }

              return this.options.includeChildren
            })

            return DecorationSet.create(doc, decorations)
          },
        },
      }),
    ]
  },
})
