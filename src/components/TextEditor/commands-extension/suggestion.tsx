import { ReactRenderer } from '@tiptap/react'
import {SuggestionProps} from '@tiptap/suggestion'
import { CommandOptions } from './commands.js'
import tippy from 'tippy.js'

import {MentionList, MentionListProps, MentionListRef } from './MentionList'
import { RefAttributes } from 'react'

export const suggestion: CommandOptions['suggestion'] = {
  items: ({ query }) => {
    return [
      {
        title: 'Heading 1',
        type: 'heading',
        attrs: {
          level: 1
        }
      },
      {
        title: 'Heading 2',
        type: 'heading',
        attrs: {
          level: 2
        }
      },
      {
        title: 'Heading 3',
        type: 'heading',
        attrs: {
          level: 3
        }
      },
      {
        title: 'Bullet List',
        type: 'bulletList',
      },
      {
        title: 'Ordered List',
        type: 'orderedList',
      },
      {
        title: 'Paragraph',
        type: 'paragraph',
      },
      {
        title: 'Button',
        type: 'button',
      },
      {
        title: 'Columns',
        type: 'columns',
      }
    ]
      .filter(item => item.title.toLowerCase().startsWith(query.toLowerCase()))
      .slice(0, 5)
  },

  render: () => {
    let component: ReactRenderer<MentionListRef, MentionListProps & RefAttributes<MentionListRef>>;
    let popup:any;

    return {
      onStart: (props: SuggestionProps) => {
        component = new ReactRenderer(MentionList, {
          props,
          editor: props.editor,
        })

        if (!props.clientRect) {
          return
        }

        popup = tippy('body', {
          getReferenceClientRect: props.clientRect as () => DOMRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'bottom-start',
        })
      },

      onUpdate(props) {
        component.updateProps(props)

        if (!props.clientRect) {
          return
        }

        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        })
      },

      onKeyDown(props) {
        if (props.event.key === 'Escape') {
          popup[0].hide()

          return true
        }

        return component.ref?.onKeyDown(props) || false
      },

      onExit() {
        popup[0].destroy()
        component.destroy()
      },
    }
  },
}
