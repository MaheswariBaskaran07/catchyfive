import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';

export default function CategorySelector() {
  const [category, setCategory] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  return (
    <FormControl fullWidth sx={{ mt: 3 }}>
      <InputLabel>Select Category</InputLabel>
      <Select value={category} label="Select Category" onChange={handleChange}>
        <MenuItem value="vegetables">Vegetables</MenuItem>
        <MenuItem value="fruits">Fruits</MenuItem>
        <MenuItem value="groceries">Groceries</MenuItem>
        <MenuItem value="beverages">Beverages</MenuItem>
      </Select>
    </FormControl>
  );
}
