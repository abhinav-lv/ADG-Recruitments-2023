import React from "react";
import { useRef } from "react";

const Modal = (props) => {
  const modalRef = useRef();
  const modalClass = props.show ? "modal" : "modal display-none";

  return (
    <div className={modalClass}>
      <div className='modal-main confirm' ref={modalRef}>
        <div className='close' onClick={props.onHide}></div>
        <h1 className='submit-heading'>Confirm Submission</h1>
        <div className='sub-heading'>
          You won't be able to re-attempt or change your answers!
        </div>
        <div className='sub-btns'>
          <button onClick={props.submitQuiz} className='btn1'>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
export default Modal;
