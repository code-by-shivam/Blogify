import { useEffect } from "react";

const Modal = ({ children, toggleModal }) => {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && toggleModal();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [toggleModal]);

  return (
    <div
      id="modal"
      onClick={(e) => e.target.id === "modal" && toggleModal()}
      className="fixed inset-0 z-50 flex justify-center overflow-y-auto bg-black/40 px-4 py-8 backdrop-blur-sm animate-in fade-in"
    >
      {children}
    </div>
  );
};

export default Modal;
