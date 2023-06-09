import React, { useState } from "react";
import "../Styles/Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Modal } from "antd";
import { AddSprint, getSprint } from "../Redux/TaskRedux/Action";

const Navbar = () => {
  const { user } = useSelector((ele) => ele.Auth);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [name, setName] = useState("");

  const HandleChange = (e) => {
    setName(e.target.value);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);

    dispatch(AddSprint(name, user.institute)).then((res) => {
      if (res.message === "Sprint Added") {
        dispatch(getSprint(user.institute));
        setName("");
      }
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="navbarDiv">
      <h2>Task Planner</h2>
      <Button type="primary" onClick={showModal}>
        Add Sprint
      </Button>
      <div>
        <img src={user.avatar} alt="two" />
        <div>
          <p>{user.name}</p>
          <p>@{user.institute}</p>
        </div>
      </div>

      <Modal
        title="Add Task"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form>
          <Input
            placeholder="Heading"
            name="heading"
            value={name}
            onChange={HandleChange}
          />
        </form>
      </Modal>
    </div>
  );
};

// name,institute,

export default Navbar;
