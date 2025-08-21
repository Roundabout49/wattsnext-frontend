import { Box, Grid, IconButton, Stack, Typography } from '@mui/material';
import { useGame } from '../context/GameContext';
import EmptyCardSmall from './cards/EmptyCardSmall';
import ProgressCardSmall from './cards/ProgressCardSmall';
import { useEffect, useRef, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useCardAnimation } from '../context/CardAnimationContext';
import { useAction } from '../context/ActionContext';
import { usePlayer } from '../context/PlayerContext';
import { cards } from '../data/cards';
import { TechnologyType } from '../types/TechnologyTypes';

const Board: React.FC = () => {
  const { gameState } = useGame();
  const { currentPlayerId } = gameState;
  const {
    climateActionCards: climateActions,
    generationCards: generation,
    storageCards: storage,
    distributionCards: distribution,
    eventCards: event,
    catastropheCard: badEvent,
  } = gameState.board;
  const { registerCardRef } = useCardAnimation();
  const { actionState, dispatchGameAction } = useAction();
  const { playerId } = usePlayer();

  const [showClimateActions, setShowClimateActions] = useState(true);
  const climateRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!showClimateActions) return;

    climateActions.forEach((_, index) => {
      const cardId = `climate-action-${index}`;
      registerCardRef(cardId, { current: climateRefs.current[index] });
    });
  }, [climateActions, showClimateActions, registerCardRef]);

  const selectedCard = (() => {
    if (actionState?.type === 'playCard' && actionState.cardId) {
      const card = cards[actionState.cardId];
      if (card) return card;
    }
    return null;
  })();

  const isCurrentPlayer = playerId === currentPlayerId;

  const selectableClimateIndex =
    isCurrentPlayer && selectedCard?.type === 'climateAction'
      ? climateActions.findIndex((c) => c === null)
      : -1;

  const isSelectableTechnologySlot = (technology: TechnologyType) => {
    if (!isCurrentPlayer) return false;
    if (selectedCard?.type !== 'technology') return false;
    if (selectedCard.supply.technology !== technology) return false;

    return true;
  };

  const isSelected = (isSelectable: boolean, index: number) =>
    isSelectable && actionState?.type === 'playCard' && actionState.selectedPosition === index;

  const handleSelectPosition = (index: number) => {
    if (isCurrentPlayer && actionState?.type === 'playCard') {
      dispatchGameAction({
        type: 'PLAY_CARD_SELECT_POSITION',
        selectedPosition: index,
      });
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: 640,
        backgroundColor: 'lightgrey',
        boxShadow: 2,
        padding: 1,
      }}
    >
      <Grid container spacing={1} columns={20}>
        {/* Climate Actions */}
        <Grid size={20}>
          <Stack direction="row">
            <Typography variant="h6">Klimaaktionen</Typography>
            <IconButton onClick={() => setShowClimateActions((prev) => !prev)} size="small">
              <ExpandMoreIcon
                sx={{
                  transform: showClimateActions ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s',
                }}
              />
            </IconButton>
          </Stack>
        </Grid>
        {showClimateActions &&
          climateActions.map((card, index) => {
            const isSelectable = index === selectableClimateIndex;
            const selected = isSelected(isSelectable, index);
            const highlight = selected ? 'selected' : isSelectable ? 'selectable' : undefined;
            const onClick = isSelectable ? () => handleSelectPosition(index) : undefined;

            return (
              <Grid size={4} key={index}>
                <div
                  ref={(el) => {
                    climateRefs.current[index] = el;
                  }}
                >
                  {card ? (
                    <ProgressCardSmall card={card} highlight={highlight} onClick={onClick} />
                  ) : (
                    <EmptyCardSmall highlight={highlight} onClick={onClick} />
                  )}
                </div>
              </Grid>
            );
          })}

        <Grid size={20}>
          <Box sx={{ height: 16 }} />
        </Grid>

        {/* Technology Cards */}
        <Grid size={5}>
          <Stack spacing={1}>
            <Typography variant="h6">Erzeugung</Typography>
            {generation.map((card, index) => {
              const isSelectable = isSelectableTechnologySlot('Generation');
              const selected = isSelected(isSelectable, index);
              const anySelected =
                isSelectable &&
                actionState?.type === 'playCard' &&
                actionState.selectedPosition !== null;
              const highlight = selected
                ? 'selected'
                : anySelected
                  ? 'notSelected'
                  : isSelectable
                    ? 'selectable'
                    : undefined;
              const onClick = isSelectable ? () => handleSelectPosition(index) : undefined;

              const cardId = `generation-${index}`;
              const cardRef = useRef<HTMLDivElement>(null);

              useEffect(() => {
                registerCardRef(cardId, cardRef);
              }, [cardId]);

              return (
                <div ref={cardRef} key={index}>
                  {card ? (
                    <ProgressCardSmall card={card} highlight={highlight} onClick={onClick} />
                  ) : (
                    <EmptyCardSmall highlight={highlight} onClick={onClick} />
                  )}
                </div>
              );
            })}
          </Stack>
        </Grid>
        <Grid size={5}>
          <Stack spacing={1}>
            <Typography variant="h6">Verteilung</Typography>
            {distribution.map((card, index) => {
              const isSelectable = isSelectableTechnologySlot('Distribution');
              const selected = isSelected(isSelectable, index);
              const highlight = selected ? 'selected' : isSelectable ? 'selectable' : undefined;
              const onClick = isSelectable ? () => handleSelectPosition(index) : undefined;

              const cardId = `distribution-${index}`;
              const cardRef = useRef<HTMLDivElement>(null);

              useEffect(() => {
                registerCardRef(cardId, cardRef);
              }, [cardId]);

              return (
                <div ref={cardRef} key={index}>
                  {card ? (
                    <ProgressCardSmall card={card} highlight={highlight} onClick={onClick} />
                  ) : (
                    <EmptyCardSmall highlight={highlight} onClick={onClick} />
                  )}
                </div>
              );
            })}
          </Stack>
        </Grid>
        <Grid size={5}>
          <Stack spacing={1}>
            <Typography variant="h6">Speicher</Typography>
            {storage.map((card, index) => {
              const isSelectable = isSelectableTechnologySlot('Storage');
              const selected = isSelected(isSelectable, index);
              const highlight = selected ? 'selected' : isSelectable ? 'selectable' : undefined;
              const onClick = isSelectable ? () => handleSelectPosition(index) : undefined;

              const cardId = `storage-${index}`;
              const cardRef = useRef<HTMLDivElement>(null);

              useEffect(() => {
                registerCardRef(cardId, cardRef);
              }, [cardId]);

              return (
                <div ref={cardRef} key={index}>
                  {card ? (
                    <ProgressCardSmall card={card} highlight={highlight} onClick={onClick} />
                  ) : (
                    <EmptyCardSmall highlight={highlight} onClick={onClick} />
                  )}
                </div>
              );
            })}
          </Stack>
        </Grid>
        <Grid size={1} />

        {/* Event Cards */}
        <Grid size={4}>
          <Stack spacing={2}>
            <Typography variant="h6">Ereignis</Typography>
            {event ? <EmptyCardSmall /> : <EmptyCardSmall />}
            <Typography variant="h6">Schlechtes Ereignis</Typography>
            {badEvent ? <EmptyCardSmall /> : <EmptyCardSmall />}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Board;
