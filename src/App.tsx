import { useState, useEffect, useMemo } from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import { LightMode, DarkMode } from "@mui/icons-material";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import type { Task } from "./types/Task";
import { motion } from "framer-motion";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("tasks");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) return parsed;
        } catch (e) {
          console.error("Failed to parse tasks:", e);
        }
      }
    }
    return [];
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("darkMode") === "true";
    }
    return false;
  });

  // 🧠 Save tasks & theme to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

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

  // 🎨 Dynamic gradient colors for each mode
  const backgroundGradient = useMemo(
    () =>
      darkMode
        ? "linear-gradient(135deg, #0f2027, #203a43, #2c5364)"
        : "linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #6dd5fa 100%)",
    [darkMode]
  );

  const paperStyle = useMemo(
    () => ({
      p: 4,
      borderRadius: 4,
      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3)",
      backdropFilter: "blur(10px)",
      backgroundColor: darkMode
        ? "rgba(20, 20, 20, 0.85)"
        : "rgba(255, 255, 255, 0.9)",
      color: darkMode ? "#fff" : "#000",
      transition: "all 0.4s ease-in-out",
    }),
    [darkMode]
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: backgroundGradient,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
        transition: "background 0.6s ease-in-out",
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Paper sx={paperStyle}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography
                variant="h4"
                fontWeight="bold"
                color={darkMode ? "secondary" : "primary"}
              >
                My To-Do List
              </Typography>

              <Tooltip title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
                <IconButton
                  onClick={() => setDarkMode((prev) => !prev)}
                  color="inherit"
                >
                  {darkMode ? <LightMode color="warning" /> : <DarkMode color="primary" />}
                </IconButton>
              </Tooltip>
            </Box>

            <TaskInput onAdd={addTask} />
            <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}
