"use client";
import Modal from "../../components/Modal.js";
import React, { useState } from "react";
const page = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="dialog-wrapper">
        <div className=""></div>
        <div className="modal-btn">
          <button onClick={() => setShowModal(true)} className="open-modal"  
           data-aos="fade-up"
           data-aos-offset="100"
           data-aos-delay="10"
           data-aos-easing="ease-in-out">
            Open Dialog Box
          </button>
        </div>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            Hello from the modal!
          </Modal>
        )}
      </div>
    </>
  );
};
export default page;
