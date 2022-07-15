import { Draggable } from "./components/Draggable"
import { Droppable } from "./components/Droppable"
import { Sortable } from "./components/Sortable"

export const Elements = () => {
  return (
    <Droppable id="elements">
      <div className="fit border w-[220px]">
        <ul>
          <li>
            <Sortable id="text" data={{from: 'elements'}}>
              <div>Text</div>
            </Sortable>

          </li>
          <li>
            <Sortable id="input" data={{from: 'elements'}}>
              <div>Input</div>
            </Sortable>
          </li>
        </ul>
      </div>
    </Droppable>
  )
}
