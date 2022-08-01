import {ElementInserterPlugin, ElementInserterPluginProps} from '.'
import { Editor } from "@tiptap/react"
import { useCallback, useEffect, useMemo, useState } from "react"
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

  const onSelect = useCallback((item: string) => {
    console.log({item})
    const {doc} = props.editor.state
    const text = doc.textContent
    const regexp = /\/([a-zA-Z0-9]+)?/
    const matches = text.match(regexp)
    console.log({matches})
    if(matches && matches.length > 0){
      const word = matches.pop() as string
      const from = (matches.index || 0) + 1
      const to = from + word.length + 1
      console.log({word, from, to})
      props.editor.commands.deleteRange({from, to})
    }
    props.editor.chain().enter().setHeading({level: 1}).focus('end').run();
  }, [props.editor])


  //const showDropdown = useMemo(() => {
  //  if (!content) return false;

  //  return (/^\/([a-zA-Z0-9]+)?/).test(content)
  //}, [content])

  //const handleSelect = (item: string) => {
  //  editor?.chain().deleteRange({from: 0, to: (content?.length || 0) + 1}).insertContent('<h1></h1>').focus().run()
  //}

  return (
    <div ref={setElement} className={props.className} style={{visibility: 'hidden'}}>
      <ElementsDropdown onSelect={onSelect}/>
    </div>
  )
}
