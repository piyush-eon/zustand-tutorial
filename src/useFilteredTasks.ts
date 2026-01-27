// useFilteredTodos.ts (Custom hook for the filtered list)
import useTaskStore, {Task} from "./store/store";
// Added useMemo to fix an infinite loop I was getting when I filtered to active or completed
import { useMemo } from "react";

export const useFilteredTasks = (): Task[] => {
    const tasks = useTaskStore(state => state.tasks);
    const filter = useTaskStore(state => state.filter);

    return useMemo(() => {
        switch (filter) {
            case 'active':
                return tasks.filter(task => !task.checked);
            case 'completed':
                return tasks.filter(task => task.checked);
            default:
                return tasks;
        }
  }, [tasks, filter]);
}; 