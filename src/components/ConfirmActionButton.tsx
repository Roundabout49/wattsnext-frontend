// components/common/CancelActionButton.tsx
import { Button } from '@mui/material';

type ConfirmActionButtonProps = {
  onConfirm: () => void;
};

export const ConfirmActionButton = ({ onConfirm }: ConfirmActionButtonProps) => (
  <Button variant="contained" onClick={onConfirm}>
    Bestätigen
  </Button>
);
