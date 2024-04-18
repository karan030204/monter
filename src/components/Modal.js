// components/Modal.js
import { useState, useEffect } from "react";
import data from "../../api/data.json";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { BsFilterCircleFill } from "react-icons/bs";
import { IoCloseCircleSharp } from "react-icons/io5";


const Modal = ({ onClose, children, title }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(data.length / itemsPerPage)
  );
  const [isMounted, setIsMounted] = useState(false);

  console.log(totalPages, "Total Pages ");
  useEffect(() => {
    setTotalPages(Math.ceil(data.length / itemsPerPage));
  }, [itemsPerPage]);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const sortByDateTime = (a, b) => {
    const dateComparison = new Date(b.date) - new Date(a.date);
    if (dateComparison !== 0) {
      return dateComparison;
    }
    // If dates are equal, compare times
    const timeA = convertTimeStringTo24HourFormat(b.downloadTime);
    const timeB = convertTimeStringTo24HourFormat(a.downloadTime);
    return timeA.localeCompare(timeB);
  };

  // Function to convert time to 24-hour format
  const convertTimeStringTo24HourFormat = (timeString) => {
    const [time, meridian] = timeString.split(" ");
    let [hours, minutes] = time.split(":");
    if (meridian === "PM") {
      hours = (parseInt(hours, 10) + 12).toString();
    }
    return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
  };

  console.log(data.length, "", itemsPerPage, "", totalPages);

  //   const sortByDate = (a, b) => {
  //     return new Date(b.date) - new Date(a.date);
  //   };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = [...data]
    .sort(sortByDateTime)
    .slice(indexOfFirstItem, indexOfLastItem);

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  if (!isMounted) {
    return null; // Don't render the modal on the server
  }

  // Sorting function

  console.log(totalPages);

  let pageNumber = [];
  for (let i = currentPage - 2; i <= currentPage + 2; i++) {
    if (i < 1) {
      continue;
    }

    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
    if (i > totalPages) {
      // setCurrentPage(totalPages)
      //   setCurrentPage(1)
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
            <div className="modal-header-icons">
              <a href="#" >
              <BsFilterCircleFill size={32}/>
              </a>
              <a href="#" onClick={handleCloseClick}>
              <IoCloseCircleSharp size={40}/>
              </a>
            </div>
          </div>
          <div className="table">
            <table>
              <thead className="table-header">
                <th>Date</th>
                <th>Report Name</th>
                <th>Download</th>
              </thead>
              {currentItems.map((item, index) => {
                return (
                  <tr className="entry" key={index}>
                    <td>
                      <div className="date">{item.date}</div>
                      {/* <div className="downloadTime">{item.downloadTime}</div> */}
                    </td>
                    <td>{item.reportName}</td>
                    <td className="download-icon">
                      <IoCloudDownloadOutline />
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>
          {/* {title && <h1>{title}</h1>}
          <div className="modal-body">{children}</div> */}
          <div className="pagination_numbers">
            <div className="dropdown">
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
            </div>

            <div className="page_no">
              <button
                className="prev"
                type=""
                onClick={() => {
                  setCurrentPage(
                    currentPage == 1 ? currentPage : currentPage - 1
                  );
                }}
              >
                prev
              </button>
              <div className="page_numbers">
                {pageNumber.map((item, index) => {
                  return (
                    <div key={index}>
                      <button
                        className={currentPage == item ? "open number" : "number"}
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
              <button
                className="next"
                type=""
                onClick={() => {
                  setCurrentPage(
                    currentPage == totalPages ? currentPage : currentPage + 1
                  );
                }}
              >
                next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
