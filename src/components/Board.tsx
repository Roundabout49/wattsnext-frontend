import { Box, Grid, IconButton, Stack, Typography } from '@mui/material';
import { useGame } from '../context/GameContext';
import EmptyCardSmall from './cards/EmptyCardSmall';
import ProgressCardSmall from './cards/ProgressCardSmall';
import { useContext, useEffect, useRef, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AnimationContext } from '../context/AnimationContext';

const Board: React.FC = () => {
  const [showClimateActions, setShowClimateActions] = useState(true);
  const { gameState } = useGame();
  const { climateActions, generation, storage, distribution, event, badEvent } = gameState.board;
  const { registerCardRef } = useContext(AnimationContext);

  return (
    <Box
      sx={{
        position: 'relative',
        width: 610,
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
            const cardId = `climate-action-${index}`;
            const cardRef = useRef<HTMLDivElement>(null);
            useEffect(() => {
              registerCardRef(cardId, cardRef);
            }, [cardId]);
            return (
              <Grid size={4} key={index}>
                <div ref={cardRef}>
                  {card ? <ProgressCardSmall card={card} /> : <EmptyCardSmall />}
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
              const cardId = `generation-${index}`;
              const cardRef = useRef<HTMLDivElement>(null);

              useEffect(() => {
                registerCardRef(cardId, cardRef);
              }, [cardId]);

              return (
                <div ref={cardRef} key={index}>
                  {card ? <ProgressCardSmall card={card} /> : <EmptyCardSmall />}
                </div>
              );
            })}
          </Stack>
        </Grid>
        <Grid size={5}>
          <Stack spacing={1}>
            <Typography variant="h6">Verteilung</Typography>
            {distribution.map((card, index) => {
              const cardId = `distribution-${index}`;
              const cardRef = useRef<HTMLDivElement>(null);

              useEffect(() => {
                registerCardRef(cardId, cardRef);
              }, [cardId]);

              return (
                <div ref={cardRef} key={index}>
                  {card ? <ProgressCardSmall card={card} /> : <EmptyCardSmall />}
                </div>
              );
            })}
          </Stack>
        </Grid>
        <Grid size={5}>
          <Stack spacing={1}>
            <Typography variant="h6">Speicher</Typography>
            {storage.map((card, index) => {
              const cardId = `storage-${index}`;
              const cardRef = useRef<HTMLDivElement>(null);

              useEffect(() => {
                registerCardRef(cardId, cardRef);
              }, [cardId]);

              return (
                <div ref={cardRef} key={index}>
                  {card ? <ProgressCardSmall card={card} /> : <EmptyCardSmall />}
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
