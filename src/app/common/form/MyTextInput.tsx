import { useField } from 'formik'
import { TextField } from '@mui/material'
import React from 'react'

interface MyTextInputProps {
  label: string
  name: string
  rows?: number
}

const MyTextInput: React.FC<MyTextInputProps> = ({ label, name, rows }) => {
  const [field, meta] = useField(name)

  return (
    <TextField
      {...field}
      multiline={!!rows}
      rows={rows}
      id={name}
      label={label}
      error={meta.touched && !!meta.error}
      helperText={meta.touched && meta.error}
    />
  )
}

export default MyTextInput
