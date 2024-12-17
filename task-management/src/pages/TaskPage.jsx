import React, { useState, useEffect, useContext } from "react";
import { notification, Button, Card } from "antd";
import TaskList from "../components/TaskList";
import TaskModal from "../components/TaskModal";
import TaskDetails from "../components/TaskDetails";
import { getTasks, deleteTask } from "../services/api";
import { TaskContext } from "../context/TaskContext";

const TaskPage = () => {
  const { tasks, setTasks } = useContext(TaskContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [viewingTask, setViewingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (error) {
      notification.error({ message: "Failed to fetch tasks" });
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      notification.success({ message: "Task deleted successfully" });
      fetchTasks();
    } catch (error) {
      notification.error({ message: "Failed to delete task" });
    }
  };

  return (
    <Card>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>Add Task</Button>
      <TaskList
        onEdit={(task) => {
          setEditingTask(task);
          setIsModalOpen(true);
        }}
        onDelete={handleDeleteTask}
        onView={(task) => {
          setViewingTask(task);
          setIsDetailsOpen(true);
        }}
      />
      <TaskModal
        visible={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        task={editingTask}
        fetchTasks={fetchTasks}
      />
      <TaskDetails
        task={viewingTask}
        open={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      />
    </Card>
  );
};

export default TaskPage;
