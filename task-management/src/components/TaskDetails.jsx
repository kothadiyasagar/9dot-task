import React from "react";
import { Modal } from "antd";

const TaskDetails = ({ task, open, onClose }) => {
  return (
    <Modal title="Task Details" visible={open} onCancel={onClose} footer={null}>
      <p><strong>Title:</strong> {task?.title}</p>
      <p><strong>Description:</strong> {task?.description}</p>
      <p><strong>Status:</strong> {task?.status}</p>
      <p><strong>Due Date:</strong> {task?.dueDate}</p>
    </Modal>
  );
};

export default TaskDetails;
