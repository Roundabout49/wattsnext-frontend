import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const NameInput = ({ onNameSubmit }: { onNameSubmit: (name: string) => void }) => {
  const [name, setName] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = () => {
    if (name.trim()) {
      localStorage.setItem('playerName', name); // Speichern im LocalStorage
      onNameSubmit(name); // Den Namen an den Parent übergeben
    }
  };

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', width: 200 }}
    >
      <TextField
        label="Gib deinen Namen ein"
        variant="outlined"
        value={name}
        onChange={handleChange}
        fullWidth
      />
      <Button variant="contained" onClick={handleSubmit} fullWidth>
        Bestätigen
      </Button>
    </Box>
  );
};

export default NameInput;
