import { Extension } from "@tiptap/react";

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    optionsdrawer: {
      setDrawerOptions: (id: string, options: Record<string, any>) => ReturnType,
      updateOption: (field: string, value: any) => ReturnType,
      closeDrawer: () => ReturnType
    }
  }
}

export interface OptionsDrawerStorage {
  id: string | null;
  options: Record<string, any>
}
export const OptionsDrawer = Extension.create<{}, OptionsDrawerStorage>({
  name: 'optionsdrawer',

  addStorage() {
    return {
      id: null,
      options: {}
    }
  },

  addCommands() {
    return {
      setDrawerOptions: (id, options) => (props) => {
        this.storage.id = id;
        this.storage.options = options
        return true
      },
      updateOption: (field, value) => (props) => {
        if (this.storage.id) {
          this.storage.options[field] = value
        }
        return true;
      },
      closeDrawer: () => () => {
        this.storage.id = null;
        this.storage.options = {}
        return true;
      }
    }
  }

})
