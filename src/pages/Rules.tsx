import { Box, Button, Stack, Typography } from '@mui/material';
import { VideoTutorial } from '../components/VideoTutorial';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

export default function Rules() {
  return (
    <Box
      sx={{
        maxWidth: 900,
        mx: 'auto',
        mt: 6,
        px: 2,
        pb: 4,
      }}
    >
      <Typography variant="h3" gutterBottom textAlign="center">
        Spielregeln
      </Typography>

      <Typography variant="body1" textAlign="center" sx={{ mb: 5 }}>
        Hier findest du alle Informationen zum Spiel „ENZo – Watts Next?“. Die Regeln werden im
        Video Schritt für Schritt erklärt. Zusätzlich steht dir eine PDF-Version zum Nachlesen oder
        Ausdrucken zur Verfügung.
      </Typography>

      {/* VIDEO */}
      <Box sx={{ mb: 8 }} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Videoanleitung
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          In diesem Video wird das Spiel anhand des physischen Brettspiels erklärt. Einige der
          Schritte, insbesondere der Aubau, passieren im Onlinespiel automatisch.
        </Typography>
        <VideoTutorial videoId="VKg85A_0j2w" />
      </Box>

      {/* PDF */}
      <Box textAlign="center">
        <Typography variant="h4" gutterBottom>
          Spielanleitung als PDF
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          Ideal zum Nachlesen, für den Unterricht oder zum Ausdrucken.
        </Typography>

        <Stack
          direction={{ xs: 'column', sm: 'row' }} // mobil untereinander
          spacing={2}
          justifyContent="center"
        >
          <Button
            variant="outlined"
            startIcon={<PictureAsPdfIcon />}
            href="/Anleitung.pdf"
            target="_blank"
          >
            PDF öffnen
          </Button>

          <Button
            variant="outlined"
            startIcon={<PictureAsPdfIcon />}
            href="/Anleitung.pdf"
            download
          >
            PDF herunterladen
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
