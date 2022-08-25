import styles from './Dialog.module.css'

import React, { cloneElement, useState } from "react";

import {
  useFloating,
  useInteractions,
  useClick,
  useRole,
  useDismiss,
  useId,
  FloatingPortal,
  FloatingOverlay,
  FloatingFocusManager
} from "@floating-ui/react-dom-interactions";

interface Props {
  open: boolean;
  onOpenChange: () => void
  onClose?: () => void,
  render: (props: {
    close: () => void;
    labelId: string;
    descriptionId: string;
  }) => React.ReactNode;
  children: JSX.Element;
}

export const Dialog = ({
  render,
  open,
  onOpenChange,
  onClose,
  children
}: Props) => {
  const { reference, floating, context, strategy, x, y } = useFloating({
    open,
    onOpenChange
  });

  const id = useId();
  const labelId = `${id}-label`;
  const descriptionId = `${id}-description`;

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useRole(context),
    useDismiss(context)
  ]);

  return (
    <>
      {cloneElement(
        children,
        getReferenceProps({ ref: reference, ...children.props })
      )}
      <FloatingPortal>
        {open && (
          <FloatingOverlay
            lockScroll
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%'
            }}
          >
            <FloatingFocusManager context={context}>
              <div
                {...getFloatingProps({
                  ref: floating,
                  className: styles.root,
                  "aria-labelledby": labelId,
                  "aria-describedby": descriptionId,
                  style: {
                    position: strategy,
                    top: y ?? 0,
                    left: x ?? 0,
                    zIndex: 9999
                  },
                })}
              >
                {render({
                  close: () => {
                    onClose && onClose();
                  },
                  labelId,
                  descriptionId
                })}
              </div>
            </FloatingFocusManager>
          </FloatingOverlay>
        )}
      </FloatingPortal>
    </>
  );
};
