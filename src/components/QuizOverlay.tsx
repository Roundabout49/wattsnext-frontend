import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useGame } from '../context/GameContext';
import { useAction } from '../context/ActionContext';
import { useSession } from '../context/SessionContext';
import { useQuizAnimation } from '../context/QuizAnimationContext';
import { useSendMessage } from '../context/SendMessageContext';
import { PendingQuiz } from '../types/Game';
import PriceIcon from './icons/PriceIcon';

// The gold money coin, sized to sit inline within text.
const CoinIcon = ({ size = 18 }: { size?: number }) => (
  <Box component="span" sx={{ display: 'inline-flex', verticalAlign: 'middle' }}>
    <PriceIcon size={size} />
  </Box>
);

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];
// The reveal auto-dismisses after this so no observer stays stuck on the overlay.
const REVEAL_AUTO_DISMISS_MS = 16000;

const CORRECT_COLOR = '#2e7d32';
const WRONG_COLOR = '#c62828';

const QuizOverlay: React.FC = () => {
  const { game, setGame } = useGame();
  const { resolutionMessage } = useAction();
  const { playerId } = useSession();
  const { reveal, answering, markAnswering, clear } = useQuizAnimation();
  const { sendAnswerQuizAction } = useSendMessage();

  // Snapshot the quiz so it keeps rendering through the reveal, even once the new game state
  // (with pendingQuiz cleared) is applied on dismiss. Wait until the triggering action's
  // resolution message has cleared, so its animation and the "… verdient." status text are seen
  // first instead of being covered immediately.
  const [card, setCard] = useState<PendingQuiz | null>(null);
  useEffect(() => {
    if (game?.pendingQuiz && !resolutionMessage) setCard(game.pendingQuiz);
  }, [game?.pendingQuiz, resolutionMessage]);

  const dismiss = () => {
    if (reveal) setGame(reveal.newGameState);
    clear();
    setCard(null);
  };

  // Auto-dismiss the reveal so everyone's overlay clears without requiring a click.
  useEffect(() => {
    if (!reveal) return;
    const timer = window.setTimeout(dismiss, REVEAL_AUTO_DISMISS_MS);
    return () => window.clearTimeout(timer);
  }, [reveal]);

  if (!card) return null;

  const isCurrentPlayer = game?.currentPlayerId === playerId;
  const currentPlayerName = game?.players.find((p) => p.id === game?.currentPlayerId)?.name ?? '';
  const isSolo = (game?.players.length ?? 1) <= 1;

  const optionColor = (index: number): string | undefined => {
    if (!reveal) return undefined;
    if (index === reveal.correctIndex) return CORRECT_COLOR;
    if (index === reveal.chosenIndex && !reveal.wasCorrect) return WRONG_COLOR;
    return undefined;
  };

  const onSelect = (index: number) => {
    if (reveal || answering || !isCurrentPlayer) return;
    sendAnswerQuizAction({ optionIndex: index });
    markAnswering();
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 1300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 640,
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: 'background.paper',
          borderRadius: 3,
          boxShadow: 8,
          p: { xs: 2.5, sm: 4 },
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant="overline" sx={{ color: 'text.secondary', letterSpacing: 2 }}>
          Quizfrage
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {card.question}
        </Typography>

        {card.info && (
          <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
            {card.info}
          </Typography>
        )}

        {!reveal && (
          <Typography
            variant="caption"
            component="div"
            sx={{
              color: 'text.secondary',
              display: 'inline-flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              columnGap: 0.75,
            }}
          >
            <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', columnGap: 0.25 }}>
              Richtige Antwort: +1
              <CoinIcon size={16} />
            </Box>
            ·
            <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', columnGap: 0.25 }}>
              Falsche Antwort: −1
              <CoinIcon size={16} />
            </Box>
          </Typography>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
          {card.options.map((option, index) => {
            const color = optionColor(index);
            // Only the active player picks, and only while the question is open. In every other
            // case the options stay fully readable but non-interactive — rather than greyed out
            // via `disabled`, which looked too dead.
            const interactive = isCurrentPlayer && !reveal && !answering;
            return (
              <Button
                key={index}
                onClick={() => onSelect(index)}
                variant={color ? 'contained' : 'outlined'}
                disableRipple={!interactive}
                sx={{
                  justifyContent: 'flex-start',
                  textAlign: 'left',
                  textTransform: 'none',
                  py: 1.25,
                  px: 2,
                  fontSize: '1rem',
                  lineHeight: 1.35,
                  ...(!interactive && { pointerEvents: 'none' }),
                  ...(color
                    ? { backgroundColor: color, color: '#fff', '&:hover': { backgroundColor: color } }
                    : !interactive
                      ? { borderColor: 'divider', color: 'text.primary' }
                      : {}),
                }}
              >
                <Box component="span" sx={{ fontWeight: 'bold', mr: 1.5 }}>
                  {OPTION_LETTERS[index] ?? index + 1})
                </Box>
                {option}
              </Button>
            );
          })}
        </Box>

        {reveal ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 1 }}>
            <Typography
              variant="subtitle1"
              component="div"
              sx={{
                fontWeight: 'bold',
                color: reveal.wasCorrect ? CORRECT_COLOR : WRONG_COLOR,
                display: 'inline-flex',
                alignItems: 'center',
                columnGap: 0.25,
              }}
            >
              <span>
                {reveal.wasCorrect ? 'Richtig!' : 'Leider falsch.'}{' '}
                {reveal.moneyDelta > 0 ? `+${reveal.moneyDelta}` : reveal.moneyDelta}
              </span>
              <CoinIcon size={20} />
            </Typography>
            <Typography variant="body2">{reveal.explanation}</Typography>
            <Button variant="contained" onClick={dismiss} sx={{ alignSelf: 'flex-end', mt: 1 }}>
              Weiter
            </Button>
          </Box>
        ) : answering ? (
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
            Antwort wird ausgewertet …
          </Typography>
        ) : (
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
            {isCurrentPlayer
              ? isSolo
                ? 'Wähle eine Antwort.'
                : 'Diskutiert gemeinsam – du wählst die Antwort fürs Team.'
              : `Diskutiert gemeinsam – ${currentPlayerName} wählt die Antwort fürs Team.`}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default QuizOverlay;
