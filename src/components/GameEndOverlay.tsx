import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useGame } from '../context/GameContext';
import { GameState, PhaseObjective } from '../types/Game';

// Official rulebook texts for the four success-rate tiers (see rules section 6, "Ende des Spiels").
const WON_TEXT =
  'Super! Ihr habt die Energiewende gemeistert und damit euren Beitrag zur gewünschten ' +
  'Klimaneutralität 2045 geleistet und gleichzeitig ausreichend Strom geliefert.';
const RATE_ABOVE_80_TEXT =
  'Klimaneutralität 2045 kann leider nicht erreicht werden. Trotzdem habt ihr gute Arbeit ' +
  'geleistet und die Energiewende fast geschafft. Die Energiewende ist eben eine ganz schön ' +
  'komplizierte Angelegenheit und ein bisschen Glück gehört auch dazu. Aber mit ein bisschen ' +
  'mehr Zeit schafft ihr die 100 % ganz bestimmt noch!';
const RATE_ABOVE_60_TEXT =
  'Klimaneutralität 2045 und gleichzeitig ausreichend Energie für Deutschland liefern kann ' +
  'leider nicht mehr erreicht werden. Aber ihr seid auf dem richtigen Weg und habt viel ' +
  'dazugelernt. Zum Glück war das nur ein Spiel. Vielleicht versucht ihr es einfach nochmal? ' +
  'Die Energiewende ist eben ein vielschichtiges und kompliziertes Problem, für das man in ' +
  'einer Stunde nicht die perfekte Lösung findet.';
const RATE_LOW_TEXT =
  'Die Energiewende ist leider nicht gelungen. Das zeigt, wie anspruchsvoll diese ' +
  'Transformation in der Realität ist! Selbst mit den besten Absichten ist es schwierig, alle ' +
  'Zielkonflikte zwischen Klimaschutz, Versorgungssicherheit und begrenzten Ressourcen ' +
  'aufzulösen und auch die Experten ringen seit Jahren um die besten Lösungen. Mit eurem neu ' +
  'erlangten Verständnis für die Zusammenhänge schafft ihr es beim nächsten Versuch bestimmt ' +
  'besser!';

// How many whole generation/distribution/storage units, plus electricity/heat as a form each,
// are still missing at the end of the final phase.
const missingUnitsAndForms = (phase: PhaseObjective): number => {
  const missingEnergy = (['generation', 'distribution', 'storage'] as const).reduce(
    (sum, key) => sum + Math.max(0, phase[key].target - phase[key].value),
    0
  );
  const missingForms = (['electricity', 'heat'] as const).reduce(
    (sum, key) => sum + (phase[key].value < phase[key].target ? 1 : 0),
    0
  );
  return missingEnergy + missingForms;
};

interface SuccessRateBreakdown {
  achieved: number;
  missing: number;
  // Unclamped result, so the formula shown to players always adds up; `rate` is what's displayed
  // as the headline percentage.
  raw: number;
  rate: number;
}

// Success rate per the rules: achieved progress points minus a penalty per missing energy
// unit/form (the rulebook's own -10 felt overly harsh, so this uses -5 instead).
const successRateBreakdown = (phase: PhaseObjective): SuccessRateBreakdown => {
  const achieved = phase.progressPoints.value;
  const missing = missingUnitsAndForms(phase);
  const raw = achieved - 5 * missing;
  return { achieved, missing, raw, rate: Math.max(0, Math.min(100, raw)) };
};

const successRateFormula = ({ achieved, missing, raw, rate }: SuccessRateBreakdown): string => {
  const formula = `${achieved} Fortschrittspunkte − 5 × ${missing} fehlende Energieeinheiten/-formen = ${raw}%`;
  return raw === rate ? formula : `${formula} (auf ${rate}% begrenzt)`;
};

const lossNarrative = (rate: number): string => {
  if (rate > 80) return RATE_ABOVE_80_TEXT;
  if (rate > 60) return RATE_ABOVE_60_TEXT;
  return RATE_LOW_TEXT;
};

// Win/lose screen, shown once the final evaluation table has closed so every
// client reveals it at the same time.
const GameEndOverlay: React.FC = () => {
  const { game, phaseCompleted } = useGame();
  const [dismissed, setDismissed] = useState(false);
  const [visible, setVisible] = useState(false);

  const isWon = game?.state === GameState.Won;
  const active = (isWon || game?.state === GameState.Lost) && !phaseCompleted && !dismissed;

  useEffect(() => {
    if (!active) {
      setVisible(false);
      return;
    }
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, [active]);

  if (!active) return null;

  // A game lost with negative money ended because a mandatory payment (e.g. an event card)
  // could not be covered — communicate that explicitly, it differs from missing the targets.
  const isBankrupt = !isWon && (game?.money ?? 0) < 0;

  // Only a loss after playing all three phases (i.e. not a bankruptcy) gets a success rate —
  // that's the case the rulebook's formula is defined for.
  const finalPhase = game?.phases[game.phaseIndex];
  const breakdown = !isWon && !isBankrupt && finalPhase ? successRateBreakdown(finalPhase) : null;

  const look = isWon
    ? {
        bg: 'rgba(20, 83, 45, 0.94)',
        emoji: '🎉',
        title: 'Gewonnen!',
        text: WON_TEXT,
        rate: 100,
        formula: null,
      }
    : isBankrupt
      ? {
          bg: 'rgba(90, 22, 22, 0.94)',
          emoji: '😢',
          title: 'Verloren',
          text: 'Das Geld hat nicht gereicht, um eine fällige Zahlung zu leisten.',
          rate: null,
          formula: null,
        }
      : {
          bg: 'rgba(90, 22, 22, 0.94)',
          emoji: '😢',
          title: 'Verloren',
          text: breakdown ? lossNarrative(breakdown.rate) : 'Die Energiewende ist diesmal nicht gelungen.',
          rate: breakdown?.rate ?? null,
          formula: breakdown ? successRateFormula(breakdown) : null,
        };

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 1400,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        px: 2,
        textAlign: 'center',
        color: 'white',
        backgroundColor: look.bg,
        opacity: visible ? 1 : 0,
        transition: 'opacity 500ms ease',
      }}
    >
      <Typography sx={{ fontSize: '5rem', lineHeight: 1 }}>{look.emoji}</Typography>
      <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
        {look.title}
      </Typography>
      {look.rate !== null && (
        <Typography variant="h4" sx={{ fontWeight: 'bold', opacity: 0.85 }}>
          Erfolgsrate: {look.rate}%
        </Typography>
      )}
      {look.formula && (
        <Typography variant="body2" sx={{ opacity: 0.7, mt: -2 }}>
          {look.formula}
        </Typography>
      )}
      <Typography variant="h6" sx={{ maxWidth: 480 }}>
        {look.text}
      </Typography>
      <Button
        variant="contained"
        onClick={() => setDismissed(true)}
        sx={{
          backgroundColor: 'white',
          color: look.bg,
          fontWeight: 'bold',
          '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.85)' },
        }}
      >
        Ergebnis ansehen
      </Button>
    </Box>
  );
};

export default GameEndOverlay;
