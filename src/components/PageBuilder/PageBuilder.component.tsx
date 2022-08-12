import { TextEditor } from "@components/TextEditor"
import { useCallback, useEffect } from "react"
import { useBuilder } from "./context/builder.context"

export const PageBuilder = () => {
  const {
    state,
    togglePreview,
  } = useBuilder()
  const { content, preview } = state;

  const logContent = useCallback(() => {
    console.log({ content })
  }, [content])

  return (
    <div className="flex justify-between bg-accent-1">
      <div className="w-[320px] border-r h-[100vh] bg-primary">
        Some config area
      </div>
      <div className="w-full px-6 py-6 mx-8 bg-primary border">
        <button type="button" className="border p-2 rounded-md mr-2" onClick={logContent}>log content</button>
        <button type="button" className="border p-2 rounded-md" onClick={() => togglePreview(!preview)}>preview: {preview ? 'ON' : 'OFF'}</button>
        <TextEditor
          content={content}
          preview={preview}
        />
      </div>
    </div>
  )
}
