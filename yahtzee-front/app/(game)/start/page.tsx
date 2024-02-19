'use client'

import StartForm from "./_components/StartForm";
import useModal from "@/utils/useModal";
import Modal from "@/global_components/Modal";

export default function Start() {

  const {isVisible, toggleModal} = useModal();

  const modalContent = (
    <div className="modal-content">Test</div>
  )

  return (
    <>
    <div className="w-full h-full flex justify-center items-center flex-col">
      {/* <StartForm/> */}
      <button onClick={toggleModal}>
        Show modal
      </button>
      <Modal isVisible={isVisible} hideModal={toggleModal} content={modalContent}/>
    </div>
    </>

  )
}
