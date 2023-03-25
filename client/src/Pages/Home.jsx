import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import "../Styles/Home.css";
import { GrEdit } from "react-icons/gr";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { AddTask, getSprint } from "../Redux/TaskRedux/Action";
import { Button, Input, Modal } from "antd";

const Home = () => {
  const dispatch = useDispatch();
  const { sprint } = useSelector((ele) => ele.Task);
  const { user } = useSelector((ele) => ele.Auth);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [sprintId, setsprintId] = useState("");
  const [Taskvalue, setTaskValue] = useState({
    status: "",
    details: "",
    assignee: "",
  });

  const HandleChange = (e) => {
    setTaskValue({ ...Taskvalue, [e.target.name]: e.target.value });
  };

  const showModal = (id) => {
    setIsModalOpen(true);
    setsprintId(id);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    console.log(Taskvalue);
    dispatch(
      AddTask(sprintId, Taskvalue.status, Taskvalue.details, Taskvalue.assignee)
    ).then((res) => {
      if (res.message === "Task Added") {
        dispatch(getSprint(user.institute));
      }
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(getSprint(user.institute));
  }, []);
  return (
    <div>
      <Navbar />
      <div className="mainTaskDiv">
        {sprint.map((ele, i) => (
          <div className="singleTaskDiv" key={i}>
            <div className="Heading">
              <h3>{ele.name}</h3>
              <button onClick={() => showModal(ele._id)}>Add</button>
            </div>
            {ele.task.map((ele, i) => (
              <div className="singleDiv" key={i}>
                <div className="firstDiv">
                  {ele.status === "Pending" ? (
                    <p style={{ backgroundColor: "red" }}>{ele.status}</p>
                  ) : (
                    <p style={{ backgroundColor: "green" }}>{ele.status}</p>
                  )}
                  <div>
                    <GrEdit />
                    <AiFillDelete />
                  </div>
                </div>
                <p>{ele.detail}</p>
                <p>{ele.assignee}</p>
              </div>
            ))}
          </div>
        ))}
      </div>

      <Modal
        title="Add Task"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form>
          <Input
            placeholder="Status"
            name="status"
            value={Taskvalue.status}
            onChange={HandleChange}
          />
          <Input
            placeholder="Detail"
            name="details"
            value={Taskvalue.details}
            onChange={HandleChange}
          />
          <Input
            placeholder="Assignee"
            name="assignee"
            value={Taskvalue.assignee}
            onChange={HandleChange}
          />
        </form>
      </Modal>
    </div>
  );
};

export default Home;
