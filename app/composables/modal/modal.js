import { Dialog } from "@headlessui/react";
import { useRef } from "react";
import "./modal.css";
export function Modal({ onClose = () => {}, children }) {
  let overlayRef = useRef();

  return (
    <Dialog
      open={true}
      onClose={onClose}
      initialFocus={overlayRef}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
    >
      <Dialog.Overlay
        ref={overlayRef}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
      />
      <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto scrollbar-hidden">
        {children}
      </div>
    </Dialog>
  );
}
