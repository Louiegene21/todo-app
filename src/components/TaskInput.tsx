import { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";

type TaskInputProps = {
  onAdd: (text: string) => void;
};

export default function TaskInput({ onAdd }: TaskInputProps) {
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (!text.trim()) return;
    onAdd(text.trim());
    setText("");
  };

  return (
    <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
      <TextField
        variant="outlined"
        placeholder="Add a new task..."
        fullWidth
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleAdd}>
        Add
      </Button>
    </Stack>
  );
}
