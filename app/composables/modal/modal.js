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
      className="fixed inset-0 z-[200] flex items-center justify-center"
    >
      <Dialog.Overlay
        ref={overlayRef}
        className="fixed inset-0 bg-gray-800/60"
      />
      <div className="relative flex items-center justify-center w-1/2">
        <div className="max-h-screen overflow-y-auto scrollbar-hidden">
          {children}
        </div>
      </div>
    </Dialog>
  );
}
