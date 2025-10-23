const Modal = ({ children, toggleModal }) => {

    function handleToggleModal(e){
        if(e.target.id === "modal"){
            toggleModal()
        }
    }

  return (
    <div id="modal" onClick={handleToggleModal}
      className="fixed inset-0 backdrop-blur-md bg-black/30 flex justify-center items-center z-50
"
    >
      {children}
    </div>
  );
};

export default Modal;