import { Editor } from "@tiptap/react"
import { useMemo } from "react"
import { ElementsDropdown } from "./ElementsDropdown.component"

interface Props {
  editor: Editor | null
}
export const ElementInserter = ({ editor }: Props) => {
  const content = editor?.getText()

  const showDropdown = useMemo(() => {
    if (!content) return false;

    return (/^\/([a-zA-Z0-9]+)?/).test(content)
  }, [content])

  const handleSelect = (item: string) => {
    console.log(item)
    editor?.chain().deleteRange({from: 0, to: (content?.length || 0) + 1}).insertContent('<h1></h1>').focus().run()
  }

  if (!editor || !content) {
    return null;
  }

  return (
    <div>
      <ElementsDropdown open={showDropdown} onSelect={handleSelect} />
    </div>
  )
}
