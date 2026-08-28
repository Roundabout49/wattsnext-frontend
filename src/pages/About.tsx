import { Box, Typography, Link, Button } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import EnergyLandscape from '../components/EnergyLandscape';

export default function About() {
  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          maxWidth: 900,
          mx: 'auto',
          mt: 6,
          px: 2,
          pb: 8,
          textAlign: 'center',
        }}
      >
      <Typography variant="h3" gutterBottom>
        Über ENZo – Watts Next?
      </Typography>

      <Typography variant="body1" sx={{ mb: 4 }}>
        „Watts Next?“ ist ein kooperatives Brettspiel zur Energiewende. Ziel des Spiels ist es,
        gemeinsam Strategien für eine nachhaltige Energieversorgung zu entwickeln und dabei
        ökologische, wirtschaftliche und gesellschaftliche Aspekte zu berücksichtigen. Es wurde im
        Rahmen der Graduiertenschule ENZo am Karlsruher Institut für Technologie (KIT) entwickelt.
        Die digitale Version überträgt das Spiel in eine interaktive Online-Umgebung und ermöglicht
        gemeinsames Spielen direkt im Browser. Für mehr Informationen zum Spiel und Zugang zu einer
        druckbaren Version, besuche die offizielle Webseite:
      </Typography>

      <Button
        variant="contained"
        endIcon={<OpenInNewIcon />}
        component={Link}
        href="https://www.enzo.kit.edu/wattsnext/"
        target="_blank"
        rel="noopener"
      >
        Zur offiziellen Watts Next? Webseite
      </Button>
      </Box>

      <Box sx={{ mt: 'auto' }}>
        <EnergyLandscape variant="minimal" />
      </Box>
    </Box>
  );
}
