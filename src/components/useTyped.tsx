import { RefObject, useEffect, useRef } from 'react'
import Typed, { TypedOptions } from 'typed.js'

type UseTyped = (
  options: TypedOptions
) => {
  ref: RefObject<any> | null,
  typed: typeof Typed | null
}

const useTyped: UseTyped = (options) => {
  const el = useRef<Element>(null);
  // Create reference to store the Typed instance itself
  const typed = useRef<any>(null);

  useEffect(() => {
    // elRef refers to the <span> rendered below
    if (el.current) {
      typed.current = new Typed(el.current, options);
    }

    return () => {
      // Make sure to destroy Typed instance during cleanup
      // to prevent memory leaks
      if (typed.current) typed.current.destroy();
    }
  }, [])

  return { ref: el, typed: typed.current }
}

export default useTyped;
