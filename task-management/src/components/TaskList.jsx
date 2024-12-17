import React, { useContext, useState, useEffect, useCallback } from "react";
import { Table, Button, Input, Select, Card, Row, Col } from "antd";
import { TaskContext } from "../context/TaskContext";
import { debounce } from "lodash";

const { Search } = Input;
const { Option } = Select;

const TaskList = ({ onEdit, onDelete, onView }) => {
  const { tasks } = useContext(TaskContext);
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState(""); // State for status filter

  useEffect(() => {
    applyFilters();
  }, [tasks, statusFilter]);

  // Debounced Search Functionality
  const handleSearch = useCallback(
    debounce((value) => {
      applyFilters(value);
    }, 500), // 500ms delay for debouncing
    [statusFilter, tasks]
  );

  const applyFilters = (searchValue = "") => {
    const lowerValue = searchValue.toLowerCase();
    let filtered = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(lowerValue) ||
        task.description.toLowerCase().includes(lowerValue)
    );

    if (statusFilter) {
      filtered = filtered.filter((task) => task.status === statusFilter);
    }

    setFilteredTasks(filtered);
  };

  // Handle status filter change
  const handleStatusFilterChange = (value) => {
    setStatusFilter(value);
  };

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Description", dataIndex: "description", key: "description", ellipsis: true },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => onView(record)}>View</Button>
          <Button type="link" onClick={() => onEdit(record)}>Edit</Button>
          <Button type="link" danger onClick={() => onDelete(record.id)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <>
      {/* Filter Section */}
      <Card style={{ marginBottom: "16px", borderRadius: "8px" }}>
        <Row gutter={[16, 16]} align="middle" justify="space-between">
          {/* Search Input */}
          <Col xs={24} sm={16}>
            <Search
              placeholder="Search tasks by title or description"
              onChange={(e) => handleSearch(e.target.value)} // Trigger debounced search
              allowClear
            />
          </Col>

          {/* Status Filter */}
          <Col xs={24} sm={8}>
            <Select
              placeholder="Filter by status"
              onChange={handleStatusFilterChange}
              allowClear
              style={{ width: "100%" }}
            >
              <Option value="Pending">Pending</Option>
              <Option value="In Progress">In Progress</Option>
              <Option value="Completed">Completed</Option>
            </Select>
          </Col>
        </Row>
      </Card>

      {/* Task Table */}
      <Table
        dataSource={filteredTasks}
        columns={columns}
        rowKey="id"
        pagination={{
          current: currentPage,
          pageSize: 5,
          onChange: (page) => setCurrentPage(page),
        }}
      />
    </>
  );
};

export default TaskList;

