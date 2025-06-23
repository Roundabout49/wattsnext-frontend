// components/common/CancelActionButton.tsx
import { Button } from '@mui/material';

type CancelActionButtonProps = {
  onCancel: () => void;
};

export const CancelActionButton = ({ onCancel }: CancelActionButtonProps) => (
  <Button variant="contained" color="error" onClick={onCancel}>
    Abbrechen
  </Button>
);
