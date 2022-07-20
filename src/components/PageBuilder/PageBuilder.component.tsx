import { TextEditor } from "@components/TextEditor"
import { Editor } from "@tiptap/react"
import { useCallback, useEffect, useState } from "react"
import { createEditor } from "./utils"
import { v4 } from 'uuid'
import { useBuilder } from "./context/builder.context"

export const PageBuilder = () => {
  const { state, addEditor, removeBlock, mapEditor } = useBuilder()
  const { editorIds } = state;
  //const [editorsMap, setEditorsMap] = useState<{ [id: string]: Editor }>({})
  //const [editorIds, setEditors] = useState<string[]>([])
  //const handleEnter = useCallback((id: string) => {
  //  // insert editor after id
  //  const index = editorIds.indexOf(id)
  //  setEditors([
  //    ...editorIds.slice(0, index + 1),
  //    v4(),
  //    ...editorIds.slice(index + 1)
  //  ])
  //}, [editorIds])

  //const handleDestroy = useCallback((id: string) => {
  //  const index = editorIds.indexOf(id)
  //  console.log({index, id, editorIds})
  //  //setEditors(editorIds.filter(editorId => editorId !== id))
  //  if(index && index > 0) {
  //    const previousId = editorIds[index - 1]
  //    console.log({previousId})
  //    if(previousId){
  //      const editor = editorsMap[previousId]
  //      console.log({editor});
  //      editor?.commands.focus()
  //    }
  //  }
  //}, [])

  useEffect(() => {
    addEditor(-1)
  }, [])

  return (
    <div className="flex justify-between bg-accent-1">
      <div className="w-[320px] border-r h-[100vh] bg-primary">
        Some config area
      </div>
      <div className="w-full px-6 py-6 mx-8 bg-primary border">
        {editorIds.map((id:string) => (
          <div key={id}>
          <TextEditor id={id} onEnter={addEditor} onDelete={removeBlock} setNodeRef={(ref) => {
            mapEditor(ref.current.id, ref.current.editor)
          }} />
          </div>
        ))}
      </div>
    </div>
  )
}
