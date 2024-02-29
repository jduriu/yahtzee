import { createPortal } from "react-dom"

const Modal = ({ isVisible, hideModal, content}) => {

  return (isVisible ?
    createPortal(
      <>
        <div className='modal-blur'></div>
        <div className='modal-container' onClick={hideModal}>
          <div className="modal-card">
            {content}
          </div>
        </div>
      </>,
      document.body
    )
    : null
  )
};
export default Modal;
