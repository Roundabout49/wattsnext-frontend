import { Stack, Typography, Tooltip, IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export const LabelWithInfo = ({ label, info }: { label: string; info: string }) => (
  <Stack direction="row" alignItems="center" spacing={0.5}>
    <Typography>{label}</Typography>
    <Tooltip title={info} arrow>
      <IconButton size="small">
        <InfoOutlinedIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  </Stack>
);
