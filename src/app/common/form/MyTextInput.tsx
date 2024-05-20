import { useField } from "formik";
import { Box, MenuItem, TextField } from "@mui/material";
import React from "react";

interface MyTextInputProps {
  label: string;
  name: string;
  rows?: number;
  type?: string;
  fullWidth?: boolean;
  select?: boolean;
  list?: any[];
  defaultValue?: string;
}

const MyTextInput: React.FC<MyTextInputProps> = ({
  label,
  name,
  rows,
  type,
  fullWidth,
  select,
  list,
  defaultValue,
}) => {
  const [field, meta] = useField(name);

  let id = name;
  if (rows) id = "outlined-textarea";
  if (select) id = "outlined-select-currency";

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
        id={id}
        fullWidth={fullWidth}
        select={select}
        defaultValue={defaultValue}
        minRows={rows ? 2 : undefined}
        error={meta.touched && !!meta.error}
        helperText={meta.touched && meta.error}
      >
        {list?.map((item) => {
          return (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          );
        })}
      </TextField>
    </Box>
  );
};

export default MyTextInput;
