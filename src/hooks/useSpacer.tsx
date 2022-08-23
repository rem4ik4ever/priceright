import interact from "interactjs"
import { MutableRefObject, useEffect, useState } from "react"

export const useSpacer = (target: MutableRefObject<HTMLDivElement | null>, onUpdate: (val: number) => void) => {
  const [] = useState(false)
  useEffect(() => {
    if (!target?.current) return
    interact(target.current)
      .resizable({
        edges: { top: false, left: false, bottom: true, right: false },
        listeners: {
          move: function (event) {
            Object.assign(event.target.style, {
              height: `${event.rect.height}px`,
            })
            onUpdate(event.rect.height)
          }
        }
      })
    return () => { }
  }, [target, onUpdate])
}
