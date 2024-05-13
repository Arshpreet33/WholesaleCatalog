import { useField } from "formik";
import { Box, TextField } from "@mui/material";
import React from "react";

interface MyTextInputProps {
  label: string;
  name: string;
  rows?: number;
  type?: string;
  fullWidth?: boolean;
}

const MyTextInput: React.FC<MyTextInputProps> = ({
  label,
  name,
  rows,
  type,
  fullWidth,
}) => {
  const [field, meta] = useField(name);

  return (
    <Box
      sx={{
        width: 600,
        maxWidth: "100%",
      }}
    >
      <TextField
        {...field}
        type={type}
        multiline={!!rows}
        label={label}
        id={rows ? "outlined-textarea" : name}
        fullWidth={fullWidth}
        minRows={rows ? 2 : undefined}
        error={meta.touched && !!meta.error}
        helperText={meta.touched && meta.error}
      />
    </Box>
  );
};

export default MyTextInput;
