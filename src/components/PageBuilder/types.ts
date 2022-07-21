import { Editor } from "@tiptap/react";

export type PageBlock = {
  id: string;
  editor: Editor;
  content?: string;
}
