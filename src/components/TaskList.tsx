import { List, ListItem, ListItemText, IconButton, Checkbox, Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { motion, AnimatePresence } from "framer-motion";
import type { Task } from "../types/Task";

type TaskListProps = {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  return (
    <List>
      <AnimatePresence>
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: -20,
              transition: { duration: 0.25, ease: "easeOut" },
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Paper
              sx={{
                mb: 1,
                p: 1,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                bgcolor: task.completed ? "success.light" : "background.paper",
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
                  transform: "translateY(-2px)",
                },
              }}
              elevation={3}
            >
              <ListItem disablePadding>
                <Checkbox
                  checked={task.completed}
                  onChange={() => onToggle(task.id)}
                  color="success"
                  sx={{
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.1)",
                    },
                  }}
                />
                <ListItemText
                  primary={task.text}
                  sx={{
                    textDecoration: task.completed ? "line-through" : "none",
                    color: task.completed ? "text.secondary" : "text.primary",
                    fontWeight: 500,
                    transition: "color 0.3s ease",
                  }}
                />
              </ListItem>
              <motion.div whileHover={{ rotate: 10 }} whileTap={{ scale: 0.9 }}>
                <IconButton onClick={() => onDelete(task.id)} color="error">
                  <DeleteIcon />
                </IconButton>
              </motion.div>
            </Paper>
          </motion.div>
        ))}
      </AnimatePresence>
    </List>
  );
}
