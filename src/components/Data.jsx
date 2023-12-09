import React from "react";
import "./Data.css";
import { FaUserCircle } from "react-icons/fa";

// Todo
import { FaRegCircle } from "react-icons/fa";

// In progress
import { TbProgress } from "react-icons/tb";

// Cancelled
import { MdCancel } from "react-icons/md";

// Complete
import { FaCheckCircle } from "react-icons/fa";

// Backlog
import { FaBackspace } from "react-icons/fa";

// 0 No
import { BsThreeDots } from "react-icons/bs";

// 1 Low
import { PiCellSignalLowFill } from "react-icons/pi";

// 2 Medium
import { PiCellSignalMediumFill } from "react-icons/pi";

// 3 High
import { PiCellSignalFullFill } from "react-icons/pi";

// 4 Urgent
import { TbUrgent } from "react-icons/tb";

// Status: Todo, In Progress, Backlog, Complete, Cancelled
// Priority: 0 No, 1 Low , 2 Medium , 3 High, 4 Urgent

const imageMapping = {
  backlog: <FaBackspace />,
  inprogress: <TbProgress />,
  todo: <FaRegCircle />,
  done: <FaCheckCircle />,
};
const priorityMapping = {
  priority0: <BsThreeDots />,
  priority1: <PiCellSignalLowFill />,
  priority2: <PiCellSignalMediumFill />,
  priority3: <PiCellSignalFullFill />,
  priority4: <TbUrgent />,
};
const Data = ({
  groupBy,
  cardId,
  cardTitle,
  tag,
  status,
  priority,
  user,
  usersId,
}) => {
  const stat = status.toLowerCase().split(" ").join("");

  const imageUrl = imageMapping[stat];
  const priorityUrl = priorityMapping[stat];

  const getUserAvailability = (userId) => {
    const users = user.find((user) => user.id === userId);
    return users;
  };

  return (
    <div className="data_main">
      <div className="id-container">
        <p className="card-id">{cardId}</p>
        {groupBy !== "user" && (
          <div className="card-owner">
            {getUserAvailability(usersId).icon}
            <div
              className={`availability ${
                getUserAvailability(usersId).available ? "available" : ""
              }`}
            ></div>
          </div>
        )}
      </div>
      <div className="title-container">
        {groupBy !== "status" && (
          <div className="title-icon-div">{imageUrl}</div>
        )}

        <div className="title-div">{cardTitle}</div>
      </div>

      <div className="tag-container">
        {groupBy !== "priority" && (
          <div className="tag-icon-div">{priorityUrl}</div>
        )}

        <div className="tag-name">
          <div className="tag-circle"></div>
          {tag.map((data, index) => {
            return (
              <div key={index} className="tag-title">
                {data}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Data;
