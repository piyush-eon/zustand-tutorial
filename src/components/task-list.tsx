import React from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import useTaskStore from "../store/store";
import { useFilteredTasks } from "../useFilteredTasks";

const TaskList: React.FC = () => {
  const { removeTask, toggleTask } = useTaskStore();
  // const removeTask = useTaskStore(state => state.removeTask);
  // const toggleTask = useTaskStore(state => state.toggleTask);
  const filteredTasks = useFilteredTasks();
  //const filter = useTaskStore(state => state.filter);
  const setFilter = useTaskStore((state: { setFilter: any; }) => state.setFilter);

  // line 29 changed from tasks
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
      <div>
      <button onClick={() => setFilter('all')}>All</button>
      <button onClick={() => setFilter('active')}>Active</button>
      <button onClick={() => setFilter('completed')}>Completed</button> 
      </div>
      {filteredTasks.map((task) => (
        <Paper key={task.id} elevation={2} sx={{ p: 2 }}>
          <Grid container alignItems="center">
            <Grid xs={12} sm={6}>
              <Typography variant="h6">{task.name}</Typography>
            </Grid>
            <Grid xs={12} sm={6}>
              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                <Button
                  variant="outlined"
                  onClick={() => toggleTask(task.id)}
                  startIcon={<CheckCircleIcon />}
                >
                  {task.checked ? "Completed" : "Mark Complete"}
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => removeTask(task.id)}
                  startIcon={<DeleteIcon />}
                >
                  Remove
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Box>
  );
};

export default TaskList;
