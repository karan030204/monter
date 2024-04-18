// components/Modal.js

import { useState, useEffect } from "react";
import data from "../../api/data.json"

const Modal = ({ onClose, children, title }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  if (!isMounted) {
    return null; // Don't render the modal on the server
  }

  return (
    <div className="modal-overlay">
      <div className="modal-wrapper">
        <div className="modal">
          <div className="modal-header">
            <div></div>
            <div className="modal-title">Recently Generated Reports</div>
            <div>
              <a href="#" onClick={handleCloseClick}>
                x
              </a>
              <a href="#" onClick={handleCloseClick}>
                x
              </a>
            </div>
          </div>
          <div className="table">
            <table>
              <tr>
                <th>Date</th>
                <th>Report Name</th>
                <th>Download</th>
              </tr>
              {data.map((item,index)=>{

                return (
                    <tr key={index}>
                        <td>{item.date}</td>
                        <td>{item.reportName}</td>
                        <td>{item.downloadTime}</td>
                    </tr>
                )

              })}
             
            </table>
          </div>
          {/* {title && <h1>{title}</h1>}
          <div className="modal-body">{children}</div> */}
        </div>
      </div>
    </div>
  );
};

export default Modal;
