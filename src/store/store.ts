/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface Task {
  id: number;
  name: string;
  checked: boolean;
}

export interface taskState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  filter: string;

  addTask: (task: Task) => void;
  removeTask: (id: number) => void;
  toggleTask: (id: number) => void;
  fetchTasks: () => Promise<void>;

  setFilter: (filter: string) => void;
}

const useTaskStore = create<taskState>()(
  persist( 
    (set) => ({
      filter: 'all',
      tasks: [],
      isLoading: false,
      error: null,
      addTask: (task) =>
        set((state) => ({
          tasks: [...state.tasks, {...task, checked: false}],
        })),
      removeTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      toggleTask: (id) => set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? {...task, checked: !task.checked} : task
          ),
        })),
      fetchTasks: async () => {
        set((state) => {
          if (state.tasks.length > 0) {
            return {};
          }
          return { isLoading: true };
        });
        try {
          // Simulating an API call only if we don't have tasks
          await new Promise((resolve) => setTimeout(resolve, 1000));
          const mocktasks: Task[] = [
            {
              id: 1,
              name: "Read",
              checked: false,
            },
            {
              id: 2,
              name: "Homework",
              checked: false,
            },
          ];
          // This is so it doesn't reset to mocktasks on refresh
          set( ( state ) => {
            if ( state.tasks.length > 0 ) {
              return { isLoading:false};
            }
            return { tasks: mocktasks, isLoading: false};
          })
        } catch (error) {
          set({ error: "Failed to fetch tasks", isLoading: false });
        }
      },
      setFilter: (filter: string) => set(() => ({filter})),
    }),
    {
      name: "test-store",
      storage: createJSONStorage(() => localStorage),
    }
  ), 
);

export default useTaskStore;
