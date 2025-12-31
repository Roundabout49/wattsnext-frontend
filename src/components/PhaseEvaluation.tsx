import React from 'react';
import { Grid, Paper, Typography, Box, Modal, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useGame } from '../context/GameContext';
import EnergyIcon from './icons/EnergyIcon';
import PointsIcon from './icons/PointsIcon';
import PriceIcon from './icons/PriceIcon';
import { GameState } from '../types/Game';

const ROWS = [
  'progressPoints',
  'generation',
  'distribution',
  'storage',
  'heat',
  'electricity',
  'money',
] as const;

const ROW_LABELS = [
  'Fortschrittspunkte',
  'Bedarf Erzeugung',
  'Bedarf Verteilung',
  'Bedarf Speicherung',
  'Wärmeerzeugung',
  'Stromerzeugung',
  'Geld',
];

const LABEL_ICONS = [
  <PointsIcon key="points" leafColor="green" />,
  <EnergyIcon key="generation" technology="Generation" />,
  <EnergyIcon key="distribution" technology="Distribution" />,
  <EnergyIcon key="storage" technology="Storage" />,
  <EnergyIcon key="heat" technology="Generation" form="Heat" size={1} />,
  <EnergyIcon key="electricity" technology="Generation" form="Electricity" size={1} />,
  <PriceIcon key="money" />,
];

const PhaseEvaluation = () => {
  const { game, phaseCompleted, setPhaseCompleted } = useGame();
  const [revealStep, setRevealStep] = React.useState(-1);

  React.useEffect(() => {
    if (!phaseCompleted) return;

    if (revealStep < ROWS.length - 1) {
      const timer = setTimeout(() => setRevealStep((prev) => prev + 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [phaseCompleted, revealStep]);

  if (!game || !phaseCompleted) return null;

  const { phases, phaseIndex } = game;
  const completedPhase = game.state === GameState.Running ? phaseIndex - 1 : phaseIndex;

  const paddingTop = '40px';
  const rowHeight = 38;

  const onClose = () => {
    if (phaseCompleted) {
      setPhaseCompleted(false);
      setRevealStep(-1);
    }
  };

  return (
    <Modal open={phaseCompleted} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          outline: 'none',
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 300,
          maxWidth: '95vw',
          overflowX: 'hidden',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        <IconButton onClick={onClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
          <CloseIcon />
        </IconButton>
        <Box sx={{ overflowX: 'auto' }}>
          <Grid container spacing={2} alignItems="start" wrap="nowrap">
            {/* Labels */}
            <Grid sx={{ minWidth: 120, flexShrink: 0 }}>
              <Box pt={paddingTop}>
                <Grid container direction="column" spacing={1}>
                  {ROW_LABELS.map((label, idx) => (
                    <Grid
                      key={idx}
                      sx={{
                        height: rowHeight,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        {label}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>

            {/* Icons */}
            <Grid sx={{ minWidth: 50, flexShrink: 0 }}>
              <Box pt={paddingTop}>
                <Grid container direction="column" spacing={1}>
                  {ROW_LABELS.map((label, idx) => (
                    <Grid
                      key={idx}
                      sx={{
                        height: rowHeight,
                        display: 'flex',
                        alignItems: 'center',
                        minWidth: 40,
                      }}
                    >
                      <Box
                        sx={{
                          transform:
                            label === 'Geld' || label === 'Fortschrittspunkte'
                              ? 'scale(0.85) translateX(12px)'
                              : 'scale(0.6)',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        {LABEL_ICONS[idx]}
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>

            {/* Phases */}
            {phases.map((phase, phaseIdx) => (
              <Grid key={phaseIdx} sx={{ minWidth: 120 }}>
                <Grid container direction="column" spacing={2}>
                  <Grid>
                    <Typography
                      variant="h6"
                      align="center"
                      sx={{ fontSize: 18, fontWeight: 'bold', whiteSpace: 'nowrap' }}
                    >
                      Phase {phaseIdx + 1}
                    </Typography>
                  </Grid>

                  {ROWS.map((row, rowIdx) => {
                    const visible =
                      phaseIdx < completedPhase ||
                      (phaseIdx === completedPhase && rowIdx <= revealStep);
                    const valueObj = phase[row];
                    const value = valueObj?.value ?? 0;
                    const target = valueObj?.target ?? 0;
                    const color = value >= target ? 'success.main' : 'error.main';

                    return (
                      <Grid key={rowIdx}>
                        <Grid container>
                          {/* Value */}
                          <Grid size={6}>
                            <Paper
                              elevation={1}
                              sx={{
                                width: '100%',
                                height: 30,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                bgcolor: visible ? '#E4F2FF' : '#f0f0f0',
                                color: visible ? color : 'inherit',
                              }}
                            >
                              {visible ? value : null}
                            </Paper>
                          </Grid>

                          {/* Target */}
                          <Grid size={6}>
                            <Paper
                              elevation={1}
                              sx={{
                                width: '100%',
                                height: 30,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                bgcolor: 'grey.100',
                              }}
                            >
                              {target}
                            </Paper>
                          </Grid>
                        </Grid>
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
};

export default PhaseEvaluation;
