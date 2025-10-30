import { Box, Grid, IconButton, Stack, Typography } from '@mui/material';
import { useGame } from '../context/GameContext';
import EmptyCardSmall from './cards/EmptyCardSmall';
import ProgressCardSmall from './cards/ProgressCardSmall';
import { useRef, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useCardAnimation } from '../context/CardAnimationContext';
import { useAction } from '../context/ActionContext';
import { useSession } from '../context/SessionContext';
import { TechnologyType } from '../types/TechnologyTypes';
import EventCardSmall from './cards/EventCardSmall';
import { getBoardPositionDomId } from '../utils/cardDomId';

const Board: React.FC = () => {
  const { game: gameState } = useGame();
  if (!gameState) return null;
  const { currentPlayerId } = gameState;
  const {
    climateActionCards: climateActions,
    generationCards: generation,
    storageCards: storage,
    distributionCards: distribution,
    /*eventCards: events,
    catastropheCard: catastrophe,*/
  } = gameState.board;
  // TODO: Replace with real events from game state
  const events = [
    {
      id: '1',
      name: 'Sonniges Wetter',
      phaseIndex: 0,
      isCatastrophe: false,
      eventDescription:
        'Produzierter Solarstrom, der den aktuellen Bedarf in Deutschland übersteigt, wird ins Ausland verkauft.',
      effectDescriptions: [
        { text: 'Geld wird um 3 Einheiten erhöht.', type: 'MoneyAndResources' },
        {
          text: 'Speicher zählen mit ihrer Systempunktzahl in die Fortschrittspunkte, da sie vollständig geladen wurden.',
          type: 'Points',
        },
      ],
      effectConditionDescription:
        'Falls Solarthermie- oder Photovoltaiktechnologien im Energiesystem vorhanden:',
    },
  ];
  const catastrophe = {
    id: '2',
    name: 'Test Katastrophe',
    phaseIndex: 0,
    isCatastrophe: true,
    eventDescription: 'Dies ist eine Testkatastrophe.',
    effectDescriptions: [
      { text: 'Du verlierst 3 Geld und 2 Ressourcen.', type: 'MoneyAndResources' },
    ],
  };
  const { registerCardRef } = useCardAnimation();
  const { actionState, dispatchGameAction } = useAction();
  const { playerId } = useSession();

  const [showClimateActions, setShowClimateActions] = useState(true);

  const climateRefs = useRef<(HTMLDivElement | null)[]>([]);
  const generationRefs = useRef<(HTMLDivElement | null)[]>([]);
  const distributionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const storageRefs = useRef<(HTMLDivElement | null)[]>([]);

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

  const selectableClimateIndex =
    isCurrentPlayer && selectedCard?.type === 'climateAction' ? climateActions.length : -1;

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
          [...Array(10)].map((_, index) => {
            const card = climateActions[index] ?? null;
            const isSelectable = index === selectableClimateIndex;
            const selected = isSelected(isSelectable, index);
            const highlight = selected ? 'selected' : isSelectable ? 'selectable' : undefined;
            const onClick = isSelectable ? () => handleSelectPosition(index) : undefined;

            return (
              <Grid size={4} key={index}>
                <div
                  ref={(el) => {
                    climateRefs.current[index] = el;
                    if (el) {
                      const domId = getBoardPositionDomId('climate-action', index);
                      registerCardRef(domId, el);
                    }
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

              return (
                <div
                  ref={(el) => {
                    generationRefs.current[index] = el;
                    if (el) {
                      const domId = getBoardPositionDomId('Generation', index);
                      registerCardRef(domId, el);
                    }
                  }}
                  key={index}
                >
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

              return (
                <div
                  ref={(el) => {
                    distributionRefs.current[index] = el;
                    if (el) {
                      const domId = getBoardPositionDomId('Distribution', index);
                      registerCardRef(domId, el);
                    }
                  }}
                  key={index}
                >
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

              return (
                <div
                  ref={(el) => {
                    storageRefs.current[index] = el;
                    if (el) {
                      const domId = getBoardPositionDomId('Storage', index);
                      registerCardRef(domId, el);
                    }
                  }}
                  key={index}
                >
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
          <Stack spacing={1}>
            <Typography variant="h6">Ereignisse</Typography>
            {events ? (
              events[0] ? (
                <EventCardSmall card={events[0]} />
              ) : (
                <EmptyCardSmall />
              )
            ) : (
              <EmptyCardSmall />
            )}
            {events ? (
              events[1] ? (
                <EventCardSmall card={events[1]} />
              ) : (
                <EmptyCardSmall />
              )
            ) : (
              <EmptyCardSmall />
            )}
            {catastrophe ? <EventCardSmall card={catastrophe} /> : <EmptyCardSmall />}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Board;
