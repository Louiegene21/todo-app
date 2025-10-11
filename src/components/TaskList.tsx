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
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
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
                transition: "0.3s",
              }}
              elevation={3}
            >
              <ListItem disablePadding>
                <Checkbox
                  checked={task.completed}
                  onChange={() => onToggle(task.id)}
                  color="success"
                />
                <ListItemText
                  primary={task.text}
                  sx={{
                    textDecoration: task.completed ? "line-through" : "none",
                    color: task.completed ? "text.secondary" : "text.primary",
                    fontWeight: 500,
                  }}
                />
              </ListItem>
              <IconButton onClick={() => onDelete(task.id)} color="error">
                <DeleteIcon />
              </IconButton>
            </Paper>
          </motion.div>
        ))}
      </AnimatePresence>
    </List>
  );
}
