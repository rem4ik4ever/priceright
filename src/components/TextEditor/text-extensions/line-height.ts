import { Extension } from '@tiptap/react';

/**
 * FontSize - Custom Extension
 * editor.commands.setFontSize(e.target.value) :set the font-size.
 */

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    lineHeight: {
      setLineHeight: (size: number) => ReturnType,
      unsetLineHeight: () => ReturnType
    }
  }
}

export const LineHeight = Extension.create({
  name: 'lineHeight',
  addOptions() {
    return {
      types: ['textStyle'],
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          lineHeight: {
            default: null,
            parseHTML: element => element.style.lineHeight.replace(/['"]+/g, ''),
            renderHTML: attributes => {
              if (!attributes.lineHeight) {
                return {};
              }
              return {
                style: `line-height: ${attributes.lineHeight}`,
              };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setLineHeight: lineHeight => ({ chain }) => {
        return chain()
          .setMark('textStyle', { lineHeight: lineHeight + "rem" })
          .run();
      },
      unsetLineHeight: () => ({ chain }) => {
        return chain()
          .setMark('textStyle', { lineHeight: null })
          .removeEmptyTextStyle()
          .run();
      },
    };
  },
});
