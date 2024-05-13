import { useField } from "formik";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";

interface MySelectInputProps {
  label: string;
  name: string;
  list: any[];
  emptyValueText: string;
  value?: string;
  fullWidth?: boolean;
}

const MySelectInput: React.FC<MySelectInputProps> = ({
  label,
  name,
  list,
  value,
  emptyValueText,
  fullWidth,
}) => {
  const [field, meta] = useField(name);

  return (
    <FormControl error={meta.touched && !!meta.error} fullWidth={fullWidth}>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        name={name}
        value={value}
        onChange={(e) => field.onChange(e)}
        style={{ width: "200px" }}
      >
        <MenuItem value="">
          <em>{emptyValueText}</em>
        </MenuItem>
        {list?.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{meta.touched && meta.error}</FormHelperText>
    </FormControl>
  );
};

export default MySelectInput;
