// components/Modal.js

import { useState, useEffect } from "react";
import data from "../../api/data.json";

const Modal = ({ onClose, children, title }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(data.length / itemsPerPage)
  );
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  if (!isMounted) {
    return null; // Don't render the modal on the server
  }

  console.log(totalPages);

  let pageNumber = [];
  for (let i = currentPage - 2; i <= currentPage+2; i++) {
    if (i < 1) {
      continue;
    }

    if (i >= totalPages) {
      break;
    }

    pageNumber.push(i);
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
              {currentItems.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.date}</td>
                    <td>{item.reportName}</td>
                    <td>{item.downloadTime}</td>
                  </tr>
                );
              })}
            </table>
          </div>
          {/* {title && <h1>{title}</h1>}
          <div className="modal-body">{children}</div> */}
          <label for="">Rows per page </label>
          <select
            onChange={(e) => {
              setItemsPerPage(parseInt(e.target.value));
            }}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>

          <div className="page_no">
            {pageNumber.map((item, index) => {
              return (
                <div key={index}>
                  <button
                    type=""
                    onClick={(e) => {
                      setCurrentPage(item);
                    }}
                  >
                    {item}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
