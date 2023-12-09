import React from "react";
import { useState } from "react";
// import { useRef } from "react";
import "./Dropdown.css";
import { FaAngleDown } from "react-icons/fa";
import { MdOutlineDisplaySettings } from "react-icons/md";

function Dropdown({ groupBy, setgroupBy, orderBy, setOrderBy }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = (isOpen) => {
    setIsOpen(!isOpen);
  };

  const handleGroupBy = (e) => {
    setgroupBy(e.target.value);
  };
  const handleOrderBy = (e) => {
    setOrderBy(e.target.value);
  };

  // const menuRef = useRef(null);
  return (
    <>
      <div className="dropdown_main">
        <MdOutlineDisplaySettings
          onClick={() => {
            toggle(isOpen);
          }}
        />
        <div
          className="drop_down_heading"
          onClick={() => {
            toggle(isOpen);
          }}
        >
          Display
        </div>
        <FaAngleDown
          onClick={() => {
            toggle(isOpen);
          }}
        />

        {isOpen ? (
          <div className="dropdown_inner">
            <div className="dropdown_row">
              <div className="dropdown_label">Grouping</div>
              <select
                className="group-by-select"
                value={groupBy}
                onChange={handleGroupBy}
                id=""
              >
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>

            <div className="dropdown_row">
              <div className="dropdown_label">Ordering</div>
              <select
                className="order-by-select"
                value={orderBy}
                onChange={handleOrderBy}
                id=""
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default Dropdown;
