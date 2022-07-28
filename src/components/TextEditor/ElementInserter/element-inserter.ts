import { Extension } from '@tiptap/core'

import { ElementInserterPlugin, ElementInserterPluginProps } from './plugin'

export type ElementInserterOptions = Omit<ElementInserterPluginProps, 'editor' | 'element'> & {
  element: HTMLElement | null,
}

export const BubbleMenu = Extension.create<ElementInserterOptions>({
  name: 'elementInserter',

  addOptions() {
    return {
      element: null,
      tippyOptions: {},
      pluginKey: 'elementInserter',
      shouldShow: null,
    }
  },

  addProseMirrorPlugins() {
    if (!this.options.element) {
      return []
    }

    return [
      ElementInserterPlugin({
        pluginKey: this.options.pluginKey,
        editor: this.editor,
        element: this.options.element,
        tippyOptions: this.options.tippyOptions,
        shouldShow: this.options.shouldShow,
      }),
    ]
  },
})
