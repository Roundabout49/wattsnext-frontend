import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useGame } from '../context/GameContext';
import { useAction } from '../context/ActionContext';
import PriceIcon from './icons/PriceIcon';
import ResourcesIcon from './icons/ResourcesIcon';
// import EnergyIcon from './icons/EnergyIcon';
import PointsIcon from './icons/PointsIcon';
import PhaseObjectives from './PhaseObjective';
import StatDelta from './StatDelta';
import { NumberTrend, useAnimatedNumber } from '../hooks/useAnimatedNumber';
import { sumEventEffect, useEventAnimation } from '../context/EventAnimationContext';
// import { orderedTechnologyTypes } from '../types/TechnologyTypes';
// import { orderedEnergyForms } from '../types/EnergyForms';
// import { TechnologyEnergyMatrix } from '../types/Game';

// Green while a value counts up, red while it counts down, normal once settled.
const trendColor = (trend: NumberTrend): string | undefined =>
  trend === 'up' ? '#2e7d32' : trend === 'down' ? '#d32f2f' : undefined;

const Status = () => {
  const { game } = useGame();
  const {
    phaseIndex: phase,
    turnInPhase: turn,
    turnsPerPhase: turnsInPhase,
    money,
    resources,
    progressPoints,
    /*technologySizes,*/
  } = game!;

  // While an event is centred, keep the numbers at their pre-event value; they
  // only count up once the event's effects are released (card starts flying).
  const { activeEvent, effectsReleased } = useEventAnimation();
  const held = activeEvent && !effectsReleased ? activeEvent.effects : [];
  const moneyTarget = money - sumEventEffect(held, 'Money');
  const resourcesTarget = resources - sumEventEffect(held, 'Resources');

  const { value: displayedMoney, trend: moneyTrend } = useAnimatedNumber(moneyTarget);
  const { value: displayedResources, trend: resourcesTrend } = useAnimatedNumber(resourcesTarget);

  // Hold the phase/turn display while a resolution message is shown, so the turn
  // counter only advances once the previous action has fully resolved.
  const { resolutionMessage } = useAction();
  const [displayedTurn, setDisplayedTurn] = useState({ phase, turn });
  useEffect(() => {
    if (!resolutionMessage) setDisplayedTurn({ phase, turn });
  }, [phase, turn, resolutionMessage]);

  // TODO: Remove when technologySizes is implemented again
  /*
  const technologySizes: TechnologyEnergyMatrix = {
    Generation: { Electricity: 4, Heat: 2 },
    Distribution: { Electricity: 2, Heat: 0 },
    Storage: { Electricity: 1, Heat: 3 },
  };
  */

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: 400, // 550 with energy matrix
        backgroundColor: 'lightgrey',
        padding: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography variant="h6" fontSize="1.1rem">
        Phase {displayedTurn.phase + 1}, Zug {displayedTurn.turn + 1}/{turnsInPhase}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          gap: 1,
        }}
      >
        <Box sx={{ transform: 'scale(1.2)', transformOrigin: 'left' }}>
          <PointsIcon points={progressPoints} leafColor="green" />
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <StatDelta value={moneyTarget}>
          <PriceIcon price={displayedMoney} color={trendColor(moneyTrend)} />
        </StatDelta>
        <StatDelta value={resourcesTarget}>
          <ResourcesIcon resources={displayedResources} color={trendColor(resourcesTrend)} />
        </StatDelta>
      </Box>

      {/*
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {orderedTechnologyTypes.map((technologyType) => (
          <Box
            key={technologyType}
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {orderedEnergyForms.map((energyType) => (
              <Box
                sx={{
                  transform: 'scale(0.8)',
                }}
                key={`${technologyType}-${energyType}`}
              >
                <EnergyIcon
                  technology={technologyType}
                  form={energyType}
                  size={technologySizes[technologyType][energyType]}
                />
              </Box>
            ))}
          </Box>
        ))}
      </Box>
      */}

      <PhaseObjectives currentPhaseIndex={displayedTurn.phase} />
    </Box>
  );
};

export default Status;
