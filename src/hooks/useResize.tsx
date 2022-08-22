import { Editor } from "@tiptap/react"
import interact from "interactjs"
import { MutableRefObject, useEffect, useState } from "react"

interface Props {
  target: MutableRefObject<HTMLDivElement | null>,
  editor: Editor,
  onUpdate: (val: number) => void
}
export const useResize = ({ target, editor, onUpdate }: Props) => {
  const [] = useState(false)
  useEffect(() => {
    if (!target?.current) return;
    interact(target.current)
      .resizable({
        edges: { top: false, left: true, bottom: false, right: true },
        axis: 'x',
        onstart: (event) => {
          editor.setEditable(false)
        },
        onend: (event) => {
          const pw = event.target.parentElement.clientWidth
          const tw = event.rect.width
          const percentage = tw * 100 / pw
          // Snap section to 100%
          if (percentage > 95) {
            Object.assign(event.target.style, {
              width: `100%`
            })
          }
          editor.setEditable(true)
        },
        listeners: {
          move: function (event) {
            const diff = event.clientX0 - event.client.x;
            const w = event.rect.width - diff
            const unit = 'px'
            Object.assign(event.target.style, {
              width: `${w}${unit}`
            })
            onUpdate(w)
          }
        },
        modifiers: [
          // keep the edges inside the parent
          interact.modifiers.restrictEdges({
            outer: 'parent'
          }),

          // minimum size
          interact.modifiers.restrictSize({
            min: { width: 100, height: 50 }
          })
        ],
      })
      .preventDefault()
    return () => { }
  }, [target, onUpdate])
}
