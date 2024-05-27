import React from "react";
import { useField } from "formik";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

interface ComboBoxProps {
  name: string;
  options: any[];
  label: string;
  onChange?: (value: string | null) => void;
}

const ComboBox: React.FC<ComboBoxProps> = ({
  name,
  options,
  label,
  onChange,
}) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = (_: any, value: any | null) => {
    helpers.setValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <Autocomplete
      {...field}
      disablePortal
      id="combo-box-demo"
      sx={{ width: 300 }}
      options={options}
      getOptionLabel={(option) => option.label}
      onChange={handleChange}
      onBlur={() => helpers.setTouched(true)}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          error={meta.touched && !!meta.error}
          helperText={meta.touched && meta.error}
        />
      )}
    />
  );
};

export default ComboBox;
