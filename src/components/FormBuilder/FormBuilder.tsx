import { closestCenter, defaultDropAnimationSideEffects, DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, DropAnimation, MeasuringConfiguration, MeasuringStrategy, pointerWithin, UniqueIdentifier, useDndContext } from "@dnd-kit/core"
import { useEffect, useState } from "react"
import { Constructor } from "./Constructor"
import { Elements } from "./Elements"
import { Element } from "./types"
import { v4 as uuidv4 } from 'uuid'
import { CSS, isKeyboardEvent } from '@dnd-kit/utilities';
import { arrayMove, SortableContext } from '@dnd-kit/sortable'
import { FormElement, Layout, Position, Props as FormElementProps } from "./components/Element"
import { findIndex } from "./utils"
import elementStyles from './components/Element.module.css'

const measuring: MeasuringConfiguration = {
  droppable: {
    strategy: MeasuringStrategy.Always,
  },
};

const dropAnimation: DropAnimation = {
  keyframes({ transform }) {
    return [
      { transform: CSS.Transform.toString(transform.initial) },
      {
        transform: CSS.Transform.toString({
          scaleX: 0.98,
          scaleY: 0.98,
          x: transform.final.x - 10,
          y: transform.final.y - 10,
        }),
      },
    ];
  },
  sideEffects: defaultDropAnimationSideEffects({
    className: {
      active: elementStyles.active,
    },
  }),
};

export const FormBuilder = () => {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const [loaded, setLoaded] = useState(false)
  const [elements, setElements] = useState<Array<Element>>([
    { id: '1', type: 'text' },
    { id: '2', type: 'text' },
    { id: '3', type: 'text' },
    { id: '4', type: 'text' },
    { id: '6', type: 'text' },
  ])
  const activeIndex = activeId ? findIndex(elements, activeId) : -1;
  const [clonedElements, setCloned] = useState<Array<Element> | null>(null)
  const handleDragEnd = (event: DragEndEvent) => {
    console.log(event)
    if (event.active.data.current?.from === 'elements' && event.over?.id === 'constructor') {
      // from Elements to Construtor
      console.log("adding")
      setElements(
        [...elements, { id: uuidv4(), type: event.active.id } as Element],
      )
    } else if (event.active.data.current?.from === "constructor" && event.over?.id === 'elements') {
      // from constructor to elements
      console.log("Removing")
      setElements(elements.filter(elm => elm.id !== event.active.id))
    } else if (event.over && event.active.data.current?.from !== 'elements') {
      if (event.active.data.current?.from === 'elements') {
        setElements(
          [...elements, { id: uuidv4(), type: event.active.id } as Element],
        )
      } else {

        const overIndex = findIndex(elements, event.over.id)
        const activeIndex = findIndex(elements, activeId);
        console.log("Moving around", { overIndex, activeIndex })
        if (typeof activeIndex === 'number' && typeof overIndex === 'number' && activeIndex !== overIndex) {
          const newIndex = overIndex;

          setElements((items) => arrayMove(items, activeIndex, newIndex));
        }
      }
    }
    setActiveId(null);
    setCloned(null);
  }
  const handleDragStart = (event: DragStartEvent) => {
    setCloned(elements)
    setActiveId(event.active.id);
  }
  const handleDragOver = (event: DragOverEvent) => {
    //console.log({ overEvent: event, overIndex: event.over?.data.current?.sortable?.index })
    //const { over, active } = event
    //// Moving from elements to construtor
    //if (active.data.current?.from === 'elements' && over && over.id !== 'elements') {
    //  if (over.data.current?.sortable) {
    //    setElements([
    //      ...(clonedElements || []).slice(0, over.data.current?.sortable.index - 1),
    //      { id: event.active.id, type: 'placeholder' } as Element,
    //      ...(clonedElements || []).slice(over.data.current?.sortable.index)
    //    ])
    //  }
    //}
  }

  useEffect(() => {
    setLoaded(true)
  }, [])

  // @dnd-kit is not SSR ready, so need to load this on the client
  if (!loaded) {
    return <div>Loading...</div>
  }

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      collisionDetection={pointerWithin}
      measuring={measuring}
    >
      <SortableContext items={elements}>
        <div className="bg-link-water">
          <div className="flex">
            <Elements />
            <Constructor elements={elements} activeIndex={activeIndex} />
          </div>
        </div>
      </SortableContext>
      <DragOverlay dropAnimation={dropAnimation}>
        {activeId ? (
          <ElementOverlay id={activeId} layout={Layout.Vertical} elements={elements} />
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}


const ElementOverlay: React.FC<Omit<FormElementProps, 'index'> & { elements: Element[] }> = ({
  id,
  elements,
  ...props
}) => {
  const { activatorEvent, over } = useDndContext();
  const isKeyboardSorting = isKeyboardEvent(activatorEvent);
  const activeIndex = findIndex(elements, id);
  const overIndex = over?.id ? findIndex(elements, over?.id) : -1;

  return (
    <FormElement
      id={id}
      {...props}
      clone
      insertPosition={
        isKeyboardSorting && overIndex !== activeIndex
          ? overIndex > activeIndex
            ? Position.After
            : Position.Before
          : undefined
      }
    />
  );
}
