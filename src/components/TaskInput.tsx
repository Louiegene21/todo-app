import { useState } from "react";
import { Box, TextField, Button, useTheme } from "@mui/material";
import { motion } from "framer-motion";

type TaskInputProps = {
  onAdd: (text: string) => void;
};

export default function TaskInput({ onAdd }: TaskInputProps) {
  const [text, setText] = useState("");
  const theme = useTheme();

  const handleAdd = () => {
    if (text.trim() === "") return;
    onAdd(text);
    setText("");
  };

  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Box display="flex" gap={2} mt={3} mb={3}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ flexGrow: 1 }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Add a new task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          sx={{
            borderRadius: 2, // 🌟 consistent rounded corners
            backgroundColor: isDarkMode
              ? "rgba(255,255,255,0.12)" // subtle white overlay for dark mode
              : "rgba(240,240,240,0.9)", // light gray for light mode
            input: {
              color: isDarkMode ? "#fff" : "#000",
              borderRadius: 2,
            },
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              "& fieldset": {
                borderColor: isDarkMode
                  ? "rgba(255,255,255,0.3)"
                  : "rgba(0,0,0,0.2)",
              },
              "&:hover fieldset": {
                borderColor: isDarkMode ? "#fff" : "#000",
              },
              "&.Mui-focused fieldset": {
                borderColor: isDarkMode ? "#90caf9" : "#1976d2",
              },
            },
          }}
        />
      </motion.div>

      <Button
        variant="contained"
        onClick={handleAdd}
        sx={{
          borderRadius: 2,
          textTransform: "none",
          px: 3,
          fontWeight: 600,
        }}
      >
        Add
      </Button>
    </Box>
  );
}
