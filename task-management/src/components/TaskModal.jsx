import React from "react";
import { Modal, Form, Input, DatePicker, Select, Button, notification } from "antd";
import moment from "moment";
import { createTask } from "../services/api"; // Import the specific method

const { Option } = Select;

const TaskModal = ({ visible, onClose, onSubmit, task, fetchTasks }) => {
  const [form] = Form.useForm();

  // Disable past dates in DatePicker
  const disabledDate = (current) => {
    return current && current < moment().startOf("day");
  };

  const handleSubmit = async (values) => {
    try {
      const taskData = {
        ...values,
        dueDate: values.dueDate ? values.dueDate.format("YYYY-MM-DD") : null, // Format date
      };

      // Assuming createTask returns a response with status or data
      const response = await createTask(taskData); // Use the imported `createTask` method

      if (response) { // Ensure you're checking the correct status
        fetchTasks(); // Refresh the task list
        onClose();
        form.resetFields();
        notification.success({ message: "Task created successfully!" });
      } else {
        notification.error({
          message: "Failed to create task",
          description: "Something went wrong, please try again later.",
        });
      }
    } catch (error) {
      console.error("Error creating task:", error);
      notification.error({
        message: "Failed to create task",
        description: error.response?.data?.message || "Something went wrong.",
      });
    }
  };

  return (
    <Modal
      title="Create Task"
      visible={visible}
      onCancel={onClose}
      onOk={() => form.submit()}
      okText="Submit"
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please enter a task title!" }]}
        >
          <Input placeholder="Enter task title" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please enter a description!" }]}
        >
          <Input.TextArea placeholder="Enter task description" rows={4} />
        </Form.Item>

        <Form.Item
          name="dueDate"
          label="Due Date"
          rules={[{ required: true, message: "Please select a due date!" }]}
        >
          <DatePicker 
            style={{ width: "100%" }} 
            disabledDate={disabledDate} // Prevent past dates
          />
        </Form.Item>

        <Form.Item
          name="status"
          label="Status"
          initialValue="Pending"
          rules={[{ required: true, message: "Please select a status!" }]}
        >
          <Select placeholder="Select task status">
            <Option value="Pending">Pending</Option>
            <Option value="In Progress">In Progress</Option>
            <Option value="Completed">Completed</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskModal;
