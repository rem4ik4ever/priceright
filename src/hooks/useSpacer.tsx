import interact from "interactjs"
import { useEffect, useState } from "react"

export const useSpacer = (cls: string, onUpdate: (val: number) => void) => {
  const [] = useState(false)
  useEffect(() => {
    interact(cls)
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
  }, [cls])
}
