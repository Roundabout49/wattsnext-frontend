import { useEffect, useState } from 'react';
import { useGame } from '../context/GameContext';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Box, Paper, Typography, IconButton, Collapse } from '@mui/material';
import ProgressCardSmall from './cards/ProgressCardSmall';
import { useCardAnimation } from '../context/CardAnimationContext';
import { useSession } from '../context/SessionContext';
import { useAction } from '../context/ActionContext';
import { useCardRefs } from '../hooks/useCardRefs';
import { getHandCardDomId } from '../utils/cardDomId';

const HandCards = () => {
  const { game: gameState } = useGame();
  const { players, currentPlayerId } = gameState!;
  const { playerId } = useSession();
  const { actionState, dispatchGameAction } = useAction();

  const { registerCardRef } = useCardAnimation();

  const [openStates, setOpenStates] = useState<Record<string, boolean>>({});

  const allCards = players.flatMap((p) => p.handCards);
  const cardRefs = useCardRefs(allCards);

  useEffect(() => {
    allCards.forEach((card) => {
      const ref = cardRefs[card.id]?.current;
      if (ref) {
        registerCardRef(getHandCardDomId(card.id), ref);
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
                {player.handCards.map((card) => {
                  const isSelected =
                    actionState?.type === 'playCard' && actionState.cardId === card.id;
                  const isAnySelected = actionState?.type == 'playCard' && !!actionState.cardId;

                  const handleClick = () => {
                    if (!isPlayable) return;

                    if (isSelected) {
                      dispatchGameAction({ type: 'PLAY_CARD_DESELECT_CARD' });
                    } else {
                      dispatchGameAction({
                        type: 'PLAY_CARD_SELECT_CARD',
                        cardId: card.id,
                        cardType: card.type,
                      });
                    }
                  };

                  return (
                    <div ref={cardRefs[card.id]} key={card.id}>
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
          </Paper>
        );
      })}
    </Box>
  );
};

export default HandCards;
