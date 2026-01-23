const Modal = ({ children, toggleModal }) => {

  function handleToggleModal(e) {
    if (e.target.id === "modal") {
      toggleModal()
    }
  }

  return (
    <div id="modal" onClick={handleToggleModal}
      className="fixed inset-0 backdrop-blur-md bg-black/30 z-50 flex justify-center overflow-y-auto py-10"
    >
      {children}
    </div>
  );
};

export default Modal;