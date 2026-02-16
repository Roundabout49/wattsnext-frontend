import { useState } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';

interface VideoProps {
  videoId: string;
}

export const VideoTutorial = ({ videoId }: VideoProps) => {
  const [consent, setConsent] = useState(false);

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        mt: 2,
      }}
    >
      {!consent ? (
        <>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Beim Abspielen des Videos werden Daten an YouTube übertragen.
          </Typography>

          <Button variant="contained" size="large" onClick={() => setConsent(true)}>
            Video laden
          </Button>
        </>
      ) : (
        <Box sx={{ mt: 2 }}>
          <iframe
            width="100%"
            height="500"
            src={`https://www.youtube-nocookie.com/embed/${videoId}`}
            title="ENZo Videoanleitung"
            style={{
              border: 0,
              borderRadius: '12px',
            }}
            allowFullScreen
          />
        </Box>
      )}
    </Paper>
  );
};
