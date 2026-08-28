import { Box, Button, Stack, Typography } from '@mui/material';
import { VideoTutorial } from '../components/VideoTutorial';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import EnergyLandscape from '../components/EnergyLandscape';

export default function Rules() {
  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
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
          Video Schritt für Schritt erklärt. Zusätzlich steht dir eine PDF-Version zum Nachlesen
          oder Ausdrucken zur Verfügung.
        </Typography>

        {/* VIDEO */}
        <Box sx={{ mb: 8 }} textAlign="center">
          <Typography variant="h4" gutterBottom>
            Videoanleitung
          </Typography>

          <Typography variant="body1" sx={{ mb: 3 }}>
            In diesem Video wird das Spiel anhand des physischen Brettspiels erklärt. Einige der
            Schritte, insbesondere der Aufbau, passieren im Onlinespiel automatisch.
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

        {/* ONLINE-SPECIFIC NOTES */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" gutterBottom textAlign="center">
            Besonderheiten der Onlineversion
          </Typography>

          <Typography variant="body1" textAlign="center" sx={{ mb: 2 }}>
            Ein paar Dinge laufen in der Online-Version anders als am physischen Spieltisch:
          </Typography>

          <Box component="ul" sx={{ pl: 3, m: 0 }}>
            <Typography component="li" variant="body1" sx={{ mb: 1.5 }}>
              Es wird nur die <strong>Standardvariante</strong> des Spiels angeboten.
            </Typography>
            <Typography component="li" variant="body1" sx={{ mb: 1.5 }}>
              Ereigniskarten werden automatisch gezogen: die erste immer zu Beginn einer Phase, die
              zweite zu einem zufälligen Zeitpunkt im Verlauf der Phase. Zusätzlich gibt es pro
              Phase zwei Quizfragen zu für euch unbekannten Zeitpunkten (eine richtige Antwort
              bringt 1 Geld, eine falsche kostet 1 Geld) – haltet also immer etwas Geld in Reserve.
            </Typography>
            <Typography component="li" variant="body1">
              Bedienung: Oben in der Aktionsleiste wählt ihr zuerst aus, welche Aktion ihr ausführen
              wollt, und klickt anschließend auf die betreffenden Karten bzw. Felder. Es gibt kein
              Drag &amp; Drop.
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 'auto' }}>
        <EnergyLandscape variant="minimal" />
      </Box>
    </Box>
  );
}
