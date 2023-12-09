import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Column from "./components/Column";
import { MdOutlineDisplaySettings } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa";
import Dropdown from "./components/Dropdown";

function Main() {
  const [groupBy, setgroupBy] = useState("status");
  const [orderBy, setOrderBy] = useState("priority");
  const [tickets, settickets] = useState([]);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    axios
      .get("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => {
        settickets((prevtickets) => (prevtickets = response.data.tickets));
        setUsers((prevUser) => (prevUser = response.data.users));
      })
      .catch((error) => {
        alert("There is some technical issue please try later");
        console.log(error);
      });
  }, []);
  return (
    <>
      <div className="header">
        <Dropdown
          groupBy={groupBy}
          setgroupBy={setgroupBy}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
        />
      </div>
      <div className="main">
        {users && tickets ? (
          <Column
            tickets={tickets}
            groupBy={groupBy}
            orderBy={orderBy}
            users={users}
          />
        ) : (
          <p>Loading</p>
        )}
        {/* <Column />
        <Column />
        <Column />
        <Column /> */}
      </div>
    </>
  );
}

export default Main;
