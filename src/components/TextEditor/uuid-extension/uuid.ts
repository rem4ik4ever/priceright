import { Extension } from "@tiptap/react";
import { Plugin } from 'prosemirror-state'
import { Decoration, DecorationSet } from 'prosemirror-view'
import { v4 } from 'uuid'

interface UUIDOptions {
  attributeName: string;
}
export const UUID = Extension.create<UUIDOptions>({
  name: 'node-uuid',

  addOptions() {
    return {
      attributeName: 'data-node-uuid'
    }
  },

  addProseMirrorPlugins(this) {
    return [
      new Plugin({
        props: {
          decorations: ({ doc }) => {
            const decorations: Decoration[] = []

            doc.descendants((node, pos) => {
              const decoration = Decoration.node(pos, pos + node.nodeSize, {
                'data-node-uuid': v4()
              })
              decorations.push(decoration)
            })
            return DecorationSet.create(doc, decorations)
          }
        }
      })
    ]
  },
})
