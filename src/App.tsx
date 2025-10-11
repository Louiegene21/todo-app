import { useState } from "react";
import { Container, Typography, Paper, Box } from "@mui/material";
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
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #6dd5fa 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Paper
            sx={{
              p: 4,
              borderRadius: 4,
              boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
              backdropFilter: "blur(8px)",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
            }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              color="primary"
              align="center"
              gutterBottom
            >
              My To-Do List
            </Typography>

            <TaskInput onAdd={addTask} />
            <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}
