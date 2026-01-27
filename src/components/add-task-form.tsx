import React, { useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import useTaskStore from "../store/store";

const AddTaskForm: React.FC = () => {
  const [task, setTask] = useState("");
  const addTask = useTaskStore((state) => state.addTask);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (task.trim()) {
      let randomId = Math.floor(Math.random() * 100);
      addTask({ id: randomId, name: task, checked: false });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Task Name"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task name"
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          Add Task
        </Button>
      </Box>
    </form>
  );
};

export default AddTaskForm;
