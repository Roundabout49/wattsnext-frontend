import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useGame } from '../context/GameContext';
import { useSession } from '../context/SessionContext';
import { useQuizAnimation } from '../context/QuizAnimationContext';
import { useSendMessage } from '../context/SendMessageContext';
import { PendingQuiz } from '../types/Game';

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];
// The reveal auto-dismisses after this so no observer stays stuck on the overlay.
const REVEAL_AUTO_DISMISS_MS = 12000;

const CORRECT_COLOR = '#2e7d32';
const WRONG_COLOR = '#c62828';

const QuizOverlay: React.FC = () => {
  const { game, setGame } = useGame();
  const { playerId } = useSession();
  const { reveal, answering, markAnswering, clear } = useQuizAnimation();
  const { sendAnswerQuizAction } = useSendMessage();

  // Snapshot the quiz so it keeps rendering through the reveal, even once the new game state
  // (with pendingQuiz cleared) is applied on dismiss.
  const [card, setCard] = useState<PendingQuiz | null>(null);
  useEffect(() => {
    if (game?.pendingQuiz) setCard(game.pendingQuiz);
  }, [game?.pendingQuiz]);

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

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
          {card.options.map((option, index) => {
            const color = optionColor(index);
            return (
              <Button
                key={index}
                onClick={() => onSelect(index)}
                disabled={!!reveal || answering || !isCurrentPlayer}
                variant={color ? 'contained' : 'outlined'}
                sx={{
                  justifyContent: 'flex-start',
                  textAlign: 'left',
                  textTransform: 'none',
                  py: 1.25,
                  px: 2,
                  fontSize: '1rem',
                  lineHeight: 1.35,
                  ...(color && {
                    backgroundColor: color,
                    color: '#fff',
                    '&:hover': { backgroundColor: color },
                    // Keep the colour readable while disabled during the reveal.
                    '&.Mui-disabled': { backgroundColor: color, color: '#fff', opacity: 1 },
                  }),
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
              sx={{ fontWeight: 'bold', color: reveal.wasCorrect ? CORRECT_COLOR : WRONG_COLOR }}
            >
              {reveal.wasCorrect ? 'Richtig!' : 'Leider falsch.'}{' '}
              {reveal.moneyDelta > 0 ? `+${reveal.moneyDelta}` : reveal.moneyDelta} Geld
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
              ? 'Diskutiert gemeinsam und wählt eine Antwort für das Team.'
              : `Diskutiert gemeinsam – ${currentPlayerName} gibt die Antwort für das Team ein.`}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default QuizOverlay;
