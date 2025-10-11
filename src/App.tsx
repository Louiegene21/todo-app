import { useState } from "react";
import { Container, Typography, Paper } from "@mui/material";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import type { Task } from "./types/Task";
import { motion } from "framer-motion";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (text: string) => {
    const newTask: Task = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 8,
        textAlign: "center",
      }}
    >
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
          My To-Do List
        </Typography>
      </motion.div>

      <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 6 }}>
        <TaskInput onAdd={addTask} />
        <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
      </Paper>
    </Container>
  );
}
