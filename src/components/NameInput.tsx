import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { usePlayer } from '../context/PlayerContext';

const NameInput = ({ onNameSubmit }: { onNameSubmit: (name: string) => void }) => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const { setPlayerName, setPlayerId } = usePlayer();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const handleNameSubmit = () => {
    if (name.trim()) {
      setPlayerName(name);
      onNameSubmit(name);
    }
  };

  const handleIdSubmit = () => {
    if (id.trim()) {
      setPlayerId(id);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', width: 200 }}
      >
        <TextField
          label="Gib deinen Namen ein"
          variant="outlined"
          value={name}
          onChange={handleNameChange}
          fullWidth
        />
        <Button variant="contained" onClick={handleNameSubmit} fullWidth>
          Bestätigen
        </Button>
      </Box>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', width: 200 }}
      >
        <TextField
          label="Gib deine Id ein"
          variant="outlined"
          value={id}
          onChange={handleIdChange}
          fullWidth
        />
        <Button variant="contained" onClick={handleIdSubmit} fullWidth>
          Bestätigen
        </Button>
      </Box>
    </Box>
  );
};

export default NameInput;
