import { useEffect, useState } from 'react';
import { useGame } from '../context/GameContext';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Box, Paper, Typography, IconButton, Collapse, Button } from '@mui/material';
import ProgressCardSmall from './cards/ProgressCardSmall';
import { useCardAnimation } from '../context/CardAnimationContext';
import { usePlayer } from '../context/PlayerContext';
import { useAction } from '../context/ActionContext';
import { useCardRefs } from '../hooks/useCardRefs';

const HandCards = () => {
  const { gameState } = useGame();
  const { players, currentPlayerId } = gameState;
  const { playerId } = usePlayer();
  const { actionState, dispatchGameAction } = useAction();

  const { registerCardRef, getCardRef, startCardAnimation } = useCardAnimation();

  const [openStates, setOpenStates] = useState<Record<string, boolean>>({});

  const allCards = players.flatMap((p) => p.hand);
  const cardRefs = useCardRefs(allCards);

  useEffect(() => {
    allCards.forEach((card) => {
      const ref = cardRefs[card.title];
      if (ref) {
        registerCardRef(card.title, ref);
      }
    });
  }, [allCards, cardRefs, registerCardRef]);

  const toggleOpen = (playerId: string) => {
    setOpenStates((prev) => ({
      ...prev,
      [playerId]: !prev[playerId],
    }));
  };

  const reorderedPlayers = (() => {
    const index = players.findIndex((p) => p.id === playerId);
    if (index === -1) return players;
    return [...players.slice(index), ...players.slice(0, index)];
  })();

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {reorderedPlayers.map((player) => {
        const isOwn = player.id === playerId;
        const isCurrent = player.id === currentPlayerId;
        const isPlayable =
          isOwn &&
          isCurrent &&
          actionState?.type === 'playCard' &&
          (actionState.step === 'selectCard' ||
            actionState.step === 'selectPosition' ||
            actionState.step === 'confirm');
        const isOpen = openStates[player.id] ?? true;

        return (
          <Paper
            key={player.id}
            variant="outlined"
            sx={{
              p: 1,
              backgroundColor: isOwn ? 'lightblue' : 'white',
              border: isOwn ? '2px solid #1976d2' : undefined,
            }}
          >
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="h6">
                {player.name} {isOwn && '(Du)'}
              </Typography>
              <IconButton onClick={() => toggleOpen(player.id)}>
                {isOpen ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </Box>

            <Collapse in={isOpen}>
              <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
                {player.hand.map((card) => {
                  const isSelected =
                    actionState?.type === 'playCard' && actionState.cardId === card.title;
                  const isAnySelected = actionState?.type == 'playCard' && !!actionState.cardId;

                  const handleClick = () => {
                    if (!isPlayable) return;

                    if (isSelected) {
                      dispatchGameAction({ type: 'PLAY_CARD_DESELECT_CARD' });
                    } else {
                      dispatchGameAction({ type: 'PLAY_CARD_SELECT_CARD', cardId: card.title });
                    }
                  };

                  return (
                    <div ref={cardRefs[card.title]} key={card.title}>
                      <ProgressCardSmall
                        card={card}
                        highlight={
                          isPlayable
                            ? isAnySelected
                              ? isSelected
                                ? 'selected'
                                : 'notSelected'
                              : 'selectable'
                            : undefined
                        }
                        onClick={handleClick}
                      />
                    </div>
                  );
                })}
              </Box>
            </Collapse>

            <Button
              variant="contained"
              onClick={() => {
                const fromRef = getCardRef(player.hand[0].title);
                const toRef = getCardRef('generation-2');

                if (fromRef?.current && toRef?.current) {
                  startCardAnimation(
                    player.hand[0].title,
                    'generation-2',
                    <ProgressCardSmall card={player.hand[0]} />,
                    () => {
                      console.log('Animation abgeschlossen');
                    }
                  );
                } else {
                  console.log('Karte oder Ziel nicht gefunden.');
                }
              }}
            >
              Animation Hand → Platz
            </Button>
          </Paper>
        );
      })}
    </Box>
  );
};

export default HandCards;
