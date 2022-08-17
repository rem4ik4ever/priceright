import { TextEditor } from "@components/TextEditor"
import { useCallback, useEffect } from "react"
import { useBuilder } from "./context/builder.context"

export const PageBuilder = () => {
  const {
    state,
    togglePreview,
  } = useBuilder()
  const { content, preview, nodeId, nodeStyles } = state;
  console.log({ nodeId, nodeStyles })

  return (
    <div className="flex justify-between bg-accent-1">
      <div className="w-[225px] border-r h-[100vh] bg-primary">
        Some config area
        <div>
          Editing node: {nodeId}
        </div>
        <pre>
          {JSON.stringify(nodeStyles)}
        </pre>
      </div>
      <div className="w-full px-6 py-6 mx-8 bg-primary border">
        <div className="my-3">
          <button type="button" className="border p-2 rounded-md" onClick={() => togglePreview(!preview)}>preview: {preview ? 'ON' : 'OFF'}</button>
        </div>
        <TextEditor
          content={content}
          preview={preview}
        />
      </div>
    </div>
  )
}
