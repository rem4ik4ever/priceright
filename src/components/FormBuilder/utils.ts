import { UniqueIdentifier } from "@dnd-kit/core";
import { Element } from "./types";

export const findIndex = (elements: Element[], id: UniqueIdentifier | null) => {
  if (!id) return -1

  let index = 0;
  while (index < elements.length) {
    if (elements[index]?.id === id) {
      return index;
    }
    index += 1;
  }
  return -1;
}

export function arrayMove(array: any[], from: number, to: number): any[] {
  const newArray = array.slice()
  newArray.splice(
    to < 0 ? newArray.length + to : to,
    0,
    newArray.splice(from, 1)[0]
  );

  return newArray;
}

