"use client"

import Modal from "../../components/Modal.js";
import React,{useState} from 'react'
import data from "../../../api/data.json"

const page = () => {
    const [showModal, setShowModal] = useState(false);
  return (
    <>

      <div>
        <button onClick={() => setShowModal(true)}>Open Modal</button>
        {showModal &&
            <Modal onClose={() => setShowModal(false)}>
                Hello from the modal!
            </Modal>
        }
      </div>
  
    </>
  )
}

export default page