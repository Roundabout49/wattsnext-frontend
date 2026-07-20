import { Box, Grid, IconButton, Stack } from '@mui/material';
import { useGame } from '../context/GameContext';
import EmptyCardSmall from './cards/EmptyCardSmall';
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useCardAnimation } from '../context/CardAnimationContext';
import { useAction } from '../context/ActionContext';
import { useSession } from '../context/SessionContext';
import { TechnologyTypes } from '../types/TechnologyTypes';
import EventCardSmall from './cards/EventCardSmall';
import boardBackground from '../assets/images/Spielbrett.png';
import SectionHeader from './SectionHeader';
import BoardCardSlot from './BoardCardSlot';
import TechnologyColumn from './TechnologyColumn';
import { getCatastropheSlotDomId, getEventSlotDomId } from '../utils/cardDomId';
import { useEventAnimation } from '../context/EventAnimationContext';

const Board: React.FC = () => {
  const { game: gameState } = useGame();
  if (!gameState) return null;
  const { currentPlayerId } = gameState;
  const {
    climateActionCards: climateActions,
    generationCards: generation,
    storageCards: storage,
    distributionCards: distribution,
    eventCards: events,
    catastropheCard: catastrophe,
  } = gameState.board;

  const { registerCardRef } = useCardAnimation();
  const { actionState, dispatchGameAction } = useAction();
  const { playerId } = useSession();
  const { activeEvent } = useEventAnimation();

  // While an event card is flying onto a slot, keep that slot empty so the card
  // only appears once it has landed.
  const isFlyingTo = (slotId: string) => activeEvent?.slotDomId === slotId;

  const [showClimateActions, setShowClimateActions] = useState(true);

  const selectedCard = (() => {
    if (actionState?.type === 'playCard' && actionState.cardId) {
      const card = gameState.players
        .find((p) => p.id === playerId)
        ?.handCards.find((c) => c.id === actionState.cardId);

      if (card) return card;
    }
    return null;
  })();

  const isCurrentPlayer = playerId === currentPlayerId;
  const selectedPosition = actionState?.type === 'playCard' ? actionState.selectedPosition : null;

  const selectableClimateIndex =
    isCurrentPlayer && selectedCard?.type === 'climateAction' ? climateActions.length : -1;

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
        backgroundImage: `url(${boardBackground})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        boxShadow: 2,
        padding: 1,
      }}
    >
      <Grid container spacing={1} columns={20}>
        {/* Climate Actions */}
        <Grid size={20}>
          <Stack direction="row">
            <SectionHeader label="Klimaaktionen" color="#70AD47" width={140} />
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
          [...Array(10)].map((_, index) => {
            const card = climateActions[index] ?? null;
            const isSelectable = index === selectableClimateIndex;
            const selected = isSelectable && selectedPosition === index;
            const highlight = selected ? 'selected' : isSelectable ? 'selectable' : undefined;
            const onClick = isSelectable ? () => handleSelectPosition(index) : undefined;

            return (
              <Grid size={4} key={index}>
                <BoardCardSlot
                  card={card}
                  area="climate-action"
                  index={index}
                  registerCardRef={registerCardRef}
                  highlight={highlight}
                  onClick={onClick}
                />
              </Grid>
            );
          })}

        <Grid size={20}>
          <Box sx={{ height: 16 }} />
        </Grid>

        {/* Technology Cards */}
        <Grid size={5}>
          <TechnologyColumn
            label="Erzeugung"
            color={TechnologyTypes['Generation'].color}
            technologyType="Generation"
            cards={generation}
            selectedCard={selectedCard}
            isCurrentPlayer={isCurrentPlayer}
            selectedPosition={selectedPosition}
            onSelectPosition={handleSelectPosition}
            registerCardRef={registerCardRef}
          />
        </Grid>
        <Grid size={5}>
          <TechnologyColumn
            label="Verteilung"
            color={TechnologyTypes['Distribution'].color}
            technologyType="Distribution"
            cards={distribution}
            selectedCard={selectedCard}
            isCurrentPlayer={isCurrentPlayer}
            selectedPosition={selectedPosition}
            onSelectPosition={handleSelectPosition}
            registerCardRef={registerCardRef}
          />
        </Grid>
        <Grid size={5}>
          <TechnologyColumn
            label="Speicher"
            color={TechnologyTypes['Storage'].color}
            technologyType="Storage"
            cards={storage}
            selectedCard={selectedCard}
            isCurrentPlayer={isCurrentPlayer}
            selectedPosition={selectedPosition}
            onSelectPosition={handleSelectPosition}
            registerCardRef={registerCardRef}
          />
        </Grid>
        <Grid size={1} />

        {/* Event Cards */}
        <Grid size={4}>
          <Stack spacing={1}>
            <SectionHeader label="Ereignisse" color="white" />
            <div ref={(el) => registerCardRef(getEventSlotDomId(0), el)}>
              {events?.[0] && !isFlyingTo(getEventSlotDomId(0)) ? (
                <EventCardSmall card={events[0]} />
              ) : (
                <EmptyCardSmall />
              )}
            </div>
            <div ref={(el) => registerCardRef(getEventSlotDomId(1), el)}>
              {events?.[1] && !isFlyingTo(getEventSlotDomId(1)) ? (
                <EventCardSmall card={events[1]} />
              ) : (
                <EmptyCardSmall />
              )}
            </div>
            <div ref={(el) => registerCardRef(getCatastropheSlotDomId(), el)}>
              {catastrophe && !isFlyingTo(getCatastropheSlotDomId()) ? (
                <EventCardSmall card={catastrophe} />
              ) : (
                <EmptyCardSmall />
              )}
            </div>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Board;
