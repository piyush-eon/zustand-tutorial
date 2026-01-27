import React, { useEffect } from "react";
import { Container, Typography, Box } from "@mui/material";
import AddTaskForm from "./components/add-task-form";
import TaskList from "./components/task-list";
//import HabitStats from "./components/habit-stats";
import useTaskStore from "./store/store";

const App: React.FC = () => {
  const { fetchTasks } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom align="center">
          Task Tracker
        </Typography>
        <AddTaskForm />
        <TaskList />
      </Box>
    </Container>
  );
};

export default App;
