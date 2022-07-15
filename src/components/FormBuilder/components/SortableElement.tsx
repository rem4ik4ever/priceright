import { Element } from "./../types"
import { isKeyboardEvent } from '@dnd-kit/utilities';
import { FormElement, Position, Props as FormElementProps } from "../components/Element"
import { useDndContext } from "@dnd-kit/core";
import { findIndex } from "../utils";

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
