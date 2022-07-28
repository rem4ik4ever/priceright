import {ElementInserterPlugin, ElementInserterPluginProps} from '.'
import { Editor } from "@tiptap/react"
import { useEffect, useMemo, useState } from "react"
import { ElementsDropdown } from "./ElementsDropdown.component"

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>

export type ElementInserterProps = Omit<Optional<ElementInserterPluginProps, 'pluginKey'>, 'element'> & {
  className?: string,
  children?: React.ReactNode
}

export const ElementInserter = (props: ElementInserterProps) => {
  const [element, setElement] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    if(!element){
      return 
    }

    if(props.editor.isDestroyed) {
      return
    }

    const {
      pluginKey = 'bubbleMenu',
      editor,
      tippyOptions = {},
      shouldShow = null,
    } = props

    const plugin = ElementInserterPlugin({
      pluginKey,
      editor,
      element,
      tippyOptions,
      shouldShow
    })

    editor.registerPlugin(plugin)

    return () => editor.unregisterPlugin(pluginKey)
  }, [
    props.editor,
    element
  ])

  return (
    <div ref={setElement} className={props.className} style={{visibility: 'hidden'}}>
      <ElementsDropdown onSelect={(item) => console.log(item)}/>
    </div>
  )
}
