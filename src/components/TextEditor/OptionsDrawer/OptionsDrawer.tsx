import { Editor } from "@tiptap/react"
import { useState } from "react";

interface Props {
  editor: Editor | undefined | null
}
export const OptionsDrawer = ({ editor }: Props) => {
  if (!editor) return null;
  return (
    <div className="absolute top-0 left-0 h-full bg-primary w-[225px] border-r">
      Drawer here
    </div>
  )
}
