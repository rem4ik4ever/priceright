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
    <div>
      <div className="flex h-12 shadow-md border-b">header</div>
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
        <div className="w-full bg-primary">
          <TextEditor
            content={content}
            preview={preview}
          />
        </div>
      </div>
    </div>
  )
}
