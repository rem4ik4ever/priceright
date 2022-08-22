import { mergeAttributes, Node } from '@tiptap/core'
import Suggestion, { SuggestionOptions } from '@tiptap/suggestion'
import { Node as ProseMirrorNode } from 'prosemirror-model'
import { PluginKey } from 'prosemirror-state'

export type CommandOptions = {
  HTMLAttributes: Record<string, any>,
  renderLabel: (props: {
    options: CommandOptions,
    node: ProseMirrorNode,
  }) => string,
  suggestion: Omit<SuggestionOptions, 'editor'>,
}

export const CommandPluginKey = new PluginKey('command')

export const Command = Node.create<CommandOptions>({
  name: 'command',

  addOptions() {
    return {
      HTMLAttributes: {},
      renderLabel({ options, node }) {
        return `${options.suggestion.char}${node.attrs.label ?? node.attrs.id}`
      },
      suggestion: {
        char: '/',
        pluginKey: CommandPluginKey,
        command: (commandProps) => {
          const { editor, range, props } = commandProps
          console.log({ commandProps })
          // increase range.to by one when the next node is of type "text"
          // and starts with a space character
          const nodeAfter = editor.view.state.selection.$to.nodeAfter
          const overrideSpace = nodeAfter?.text?.startsWith(' ')

          console.log({ props })
          const command = props.id
          if (overrideSpace) {
            range.to += 1
          }

          const content = [
            {
              type: 'text',
              text: ' ',
            },
          ]
          let execution = editor
            .chain()
            .deleteRange(range)

          switch (command.type) {
            case "heading":
              execution.focus('end').insertContent([
                {
                  type: 'heading',
                  attrs: command.attrs
                }
              ]).run()
              break;
            case "bulletList":
              execution.focus('end').toggleBulletList().run();
              break;
            case "orderedList":
              execution.focus('end').toggleOrderedList().run();
              break;
            case "paragraph":
              execution.focus('end').insertContent({
                type: 'paragraph',
              }).run();
              break;
            case "button":
              execution.focus('end').insertContent({
                type: 'button',
                attrs: {
                  url: 'https://example.com',
                  label: 'my button'
                }
              }).run()
              break;
            case 'columns':
              execution.focus('end').insertContent([{
                type: 'columns',
                content: [
                  { type: 'column', content: [{ type: 'paragraph' }] },
                  { type: 'column', content: [{ type: 'paragraph' }] }
                ]
              }]).run()
              break;
            case 'spacer':
              execution.focus('end').insertContent([{
                type: 'spacer'
              }]).run()
              break;
            default:
              console.warn('No command found')
              break;
          }

          window.getSelection()?.collapseToEnd()
        },
        allow: ({ state, range }) => {
          const $from = state.doc.resolve(range.from)
          const type = state.schema.nodes[this.name]
          const allow = !!$from.parent.type.contentMatch.matchType(type as any)

          return allow
        },
      },
    }
  },

  group: 'inline',

  inline: true,

  selectable: true,

  atom: false,

  addAttributes() {
    return {
      id: {
        default: null,
        parseHTML: element => element.getAttribute('data-id'),
        renderHTML: attributes => {
          if (!attributes.id) {
            return {}
          }

          return {
            'data-id': attributes.id,
          }
        },
      },

      label: {
        default: null,
        parseHTML: element => element.getAttribute('data-label'),
        renderHTML: attributes => {
          if (!attributes.label) {
            return {}
          }

          return {
            'data-label': attributes.label,
          }
        },
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: `span[data-type="${this.name}"]`,
      },
    ]
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      'span',
      mergeAttributes({ 'data-type': this.name }, this.options.HTMLAttributes, HTMLAttributes),
      this.options.renderLabel({
        options: this.options,
        node,
      }),
    ]
  },

  renderText({ node }) {
    return this.options.renderLabel({
      options: this.options,
      node,
    })
  },

  addKeyboardShortcuts() {
    return {
      Backspace: () => this.editor.commands.command(({ tr, state }) => {
        let isMention = false
        const { selection } = state
        const { empty, anchor } = selection

        if (!empty) {
          return false
        }

        state.doc.nodesBetween(anchor - 1, anchor, (node, pos) => {
          if (node.type.name === this.name) {
            isMention = true
            tr.insertText(this.options.suggestion.char || '', pos, pos + node.nodeSize)

            return false
          }
        })

        return isMention
      }),
    }
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ]
  },
})
