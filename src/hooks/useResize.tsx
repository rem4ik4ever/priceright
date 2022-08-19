import interact from "interactjs"
import { MutableRefObject, useEffect, useState } from "react"

export const useResize = (target: MutableRefObject<HTMLDivElement | null>, onUpdate: (val: number) => void) => {
  const [] = useState(false)
  useEffect(() => {
    if (!target?.current) return;
    interact(target.current)
      .resizable({
        edges: { top: false, left: true, bottom: false, right: true },
        axis: 'x',
        listeners: {
          move: function (event) {
            const w = event.rect.width
            const unit = 'px'
            Object.assign(event.target.style, {
              width: `${w}${unit}`,
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
    return () => { }
  }, [target, onUpdate])
}
