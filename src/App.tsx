import { useState, useEffect, useMemo } from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  IconButton,
  Tooltip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import { LightMode, DarkMode, DeleteSweep } from "@mui/icons-material";
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

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  // Save tasks & mode
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
    setSnackbar({ open: true, message: "Task added!" });
  };

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    setSnackbar({ open: true, message: "Task deleted!" });
  };

  const clearAllTasks = () => {
    setTasks([]);
    setConfirmOpen(false);
    setSnackbar({ open: true, message: "All tasks cleared!" });
  };

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
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Paper sx={paperStyle}>
            {/* Header */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography
                variant="h4"
                fontWeight="bold"
                color={darkMode ? "secondary" : "primary"}
              >
                My To-Do List
              </Typography>

              <Box display="flex" alignItems="center" gap={1}>
                {tasks.length > 0 && (
                  <Tooltip title="Clear All Tasks">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <IconButton
                        onClick={() => setConfirmOpen(true)}
                        color="error"
                      >
                        <DeleteSweep />
                      </IconButton>
                    </motion.div>
                  </Tooltip>
                )}

                <Tooltip
                  title={
                    darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
                  }
                >
                  <IconButton
                    onClick={() => setDarkMode((prev) => !prev)}
                    color="inherit"
                  >
                    {darkMode ? (
                      <LightMode color="warning" />
                    ) : (
                      <DarkMode color="primary" />
                    )}
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

            {/* Task Counter */}
            <Typography
              variant="subtitle1"
              textAlign="center"
              sx={{ mb: 2, fontWeight: 500, color: darkMode ? "#ccc" : "#555" }}
            >
              {tasks.length === 0
                ? "No tasks yet — start by adding one!"
                : `${tasks.filter((t) => !t.completed).length} remaining / ${
                    tasks.filter((t) => t.completed).length
                  } completed`}
            </Typography>

            {/* Task Input & List */}
            <TaskInput onAdd={addTask} />
            <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />

            {/* Saved Indicator */}
            <Typography
              variant="caption"
              sx={{
                display: "block",
                textAlign: "center",
                mt: 2,
                color: darkMode ? "#aaa" : "#666",
              }}
            >
              All changes saved 💾
            </Typography>
          </Paper>
        </motion.div>
      </Container>

      {/* Confirmation Dialog */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Clear All Tasks?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete all tasks? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={clearAllTasks}
            color="error"
            variant="contained"
            autoFocus
          >
            Clear All
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={() => setSnackbar({ open: false, message: "" })}
      >
        <Alert severity="success">{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}
