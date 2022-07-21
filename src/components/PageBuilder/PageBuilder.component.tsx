import { TextEditor } from "@components/TextEditor"
import { useCallback, useEffect } from "react"
import { useBuilder } from "./context/builder.context"

export const PageBuilder = () => {
  const {
    state,
    addEditor,
    removeBlock,
    mapEditor,
    togglePreview,
    setFocused,
    focusNext,
    focusPrevious,
    updateEditorContent
  } = useBuilder()
  const { editorIds, editorsMap, preview } = state;

  const onDelete = useCallback((id: string) => {
    const idx = editorIds.indexOf(id)
    if (idx > 0) {
      const focusId = editorIds[idx - 1] as string;
      editorsMap[focusId]?.editor?.commands.focus();
    }
    removeBlock(id)
  }, [editorIds])

  const logContent = useCallback(() => {
    const content = editorIds.map(id => {
      return editorsMap[id]?.editor?.getHTML()
    })
    console.log({ content })
  }, [editorsMap, editorIds])

  useEffect(() => {
    if (editorIds.length === 0) {
      addEditor(-1)
    }
  }, [])

  return (
    <div className="flex justify-between bg-accent-1">
      <div className="w-[320px] border-r h-[100vh] bg-primary">
        Some config area
      </div>
      <div className="w-full px-6 py-6 mx-8 bg-primary border">
        <button type="button" className="border p-2 rounded-md mr-2" onClick={logContent}>log content</button>
        <button type="button" className="border p-2 rounded-md" onClick={() => togglePreview(!preview)}>preview: {preview ? 'ON' : 'OFF'}</button>
        {editorIds.map((id: string, index: number) => (
          <div key={id}>
            <TextEditor
              id={id}
              index={index}
              content={editorsMap[id]?.content}
              onEnter={addEditor}
              onDelete={onDelete}
              onFocus={setFocused}
              onUp={focusPrevious}
              onDown={focusNext}
              onUpdate={updateEditorContent}
              setNodeRef={(ref) => {
                mapEditor(ref.current.id, ref.current.editor)
              }}
              preview={preview}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
