import * as React from 'react'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'

interface SearchBarProps {
  label: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
}

const SearchBar: React.FC<SearchBarProps> = ({
  label,
  value,
  onChange,
  className,
}) => (
  <Paper
    component="form"
    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', minWidth: 250 }}
  >
    <InputBase
      sx={{ ml: 1, flex: 1 }}
      placeholder={label}
      value={value}
      onChange={onChange}
      inputProps={{ 'aria-label': 'search' }}
      className={className}
    />
    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
      <SearchIcon />
    </IconButton>
  </Paper>
)

export default SearchBar
