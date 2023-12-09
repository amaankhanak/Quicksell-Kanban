import React from "react";
import "./Column.css";
import "./Data.css";
import { FaUserCircle } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import Data from "./Data";
import { useState } from "react";
import { useEffect } from "react";

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

function Column({ tickets, groupBy, orderBy, users }) {
  const [updatedFilteredTickets, setUpdatedFilteredTickets] = useState([]);

  const userIcons = {
    anoopsharma: <FaUserCircle />,
    shankarkumar: <FaUserCircle />,
    ramesh: <FaUserCircle />,
    suresh: <FaUserCircle />,
    yogesh: <FaUserCircle />,
  };

  const user = users.map((user) => ({
    ...user,
    icon: userIcons[user.name.toLowerCase().split(" ").join("")],
  }));

  const status = [
    {
      icon: <FaBackspace />,
      name: "Backlog",
    },
    {
      icon: <TbProgress />,
      name: "In progress",
    },
    {
      icon: <FaRegCircle />,
      name: "Todo",
    },
    {
      icon: <FaCheckCircle />,
      name: "Done",
    },
    {
      icon: <MdCancel />,
      name: "Canceled",
    },
  ];

  const priority = [
    {
      icon: <BsThreeDots />,
      name: "No Priority",
      number: 0,
    },
    {
      icon: <TbUrgent />,
      name: "Urgent",
      number: 4,
    },
    {
      icon: <PiCellSignalFullFill />,
      name: "High",
      number: 3,
    },
    {
      icon: <PiCellSignalMediumFill />,
      name: "Medium",
      number: 2,
    },
    {
      icon: <PiCellSignalLowFill />,
      name: "Low",
      number: 1,
    },
  ];

  const updateFilteredTickets = () => {
    switch (groupBy) {
      case "priority":
        let updatedPriority = [...priority];

        if (orderBy === "priority") {
          updatedPriority.sort((a, b) => b.number - a.number);
        }

        const updatedFilteredPriority = updatedPriority.map((priorityItem) => ({
          ...priorityItem,
          tickets: tickets
            .filter((ticket) => ticket.priority === priorityItem.number)
            .sort((a, b) => {
              if (orderBy === "title") {
                return a.title.localeCompare(b.title);
              }

              return 0;
            }),
        }));

        setUpdatedFilteredTickets(updatedFilteredPriority);
        break;
      case "status":
        const updatedFilteredStatus = status.map((statusItem) => ({
          ...statusItem,
          tickets: tickets
            .filter(
              (ticket) =>
                ticket.status.toLowerCase().split(" ").join("") ===
                statusItem.name.toLowerCase().split(" ").join("")
            )
            .sort((a, b) => {
              if (orderBy === "priority") {
                return b.priority - a.priority;
              } else if (orderBy === "title") {
                return a.title.localeCompare(b.title);
              }
              return 0;
            }),
        }));
        setUpdatedFilteredTickets(updatedFilteredStatus);
        break;
      case "user":
        const updatedFilteredUsers = user.map((userItem) => ({
          ...userItem,
          tickets: tickets
            .filter((ticket) => ticket.userId === userItem.id)
            .sort((a, b) => {
              if (orderBy === "priority") {
                return b.priority - a.priority;
              } else if (orderBy === "title") {
                return a.title.localeCompare(b.title);
              }
              return 0;
            }),
        }));
        setUpdatedFilteredTickets(updatedFilteredUsers);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    updateFilteredTickets();
  }, [groupBy, tickets, orderBy]);

  return (
    <>
      <div className="main-group-conatainer">
        <div className="group-wrapper">
          <>
            <div className="main-container">
              {updatedFilteredTickets.map((data, index) => {
                return (
                  <>
                    <div className="column_main" key={index}>
                      <div className="column_heading">
                        <div className="column_heading_left">
                          <div className="column_heading_img">{data.icon}</div>
                          <div className="column_heading_title">
                            {data.name}
                          </div>
                          <div className="column_heading_num">
                            {data.tickets.length}
                          </div>
                        </div>

                        <div className="column_heading_right">
                          <div className="column_heading_add">
                            <IoIosAdd />
                          </div>
                          <div className="column_heading_info">
                            <BsThreeDots />
                          </div>
                        </div>
                      </div>
                      {data.tickets.map((ticket, index) => (
                        <Data
                          key={index}
                          groupBy={groupBy}
                          cardId={ticket.id}
                          cardTitle={ticket.title}
                          tag={ticket.tag}
                          status={ticket.status}
                          priority={ticket.priority}
                          user={user}
                          usersId={ticket.userId}
                        />
                      ))}
                    </div>
                  </>
                );
              })}
            </div>
          </>
        </div>
      </div>
    </>
  );
}

export default Column;
