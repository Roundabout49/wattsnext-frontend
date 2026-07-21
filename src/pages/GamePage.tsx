import { Box } from '@mui/material';
import Board from '../components/Board';
import Status from '../components/Status';
import HandCards from '../components/HandCards';
import ActionBar from '../components/ActionBar';
import { PlayCardHandler } from '../handlers/PlayCardHandler';
import { EarnMoneyHandler } from '../handlers/EarnMoneyHandler';
import AnimationOverlay from '../components/AnimationOverlay';
import EventAnimationOverlay from '../components/EventAnimationOverlay';
import GameEndOverlay from '../components/GameEndOverlay';
import { useRef, useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { ChangeCardHandler } from '../handlers/ChangeCardHandler';
import PhaseEvaluation from '../components/PhaseEvaluation';

export default function GamePage() {
  const { game } = useGame();

  const boardRef = useRef<HTMLDivElement | null>(null);
  const [boardWidth, setBoardWidth] = useState<number>(0);
  const [containerWidth, setContainerWidth] = useState(0);

  const statusWidth = 180;
  const numOfCards = game?.players[0]?.handCards.length || 0;
  const oneRowWidthNeeded = numOfCards * 124 + 50;
  const twoRowsWidthNeeded = Math.ceil(numOfCards / 2) * 124 + 50;
  const availableWidthBesidesBoard = containerWidth - boardWidth - statusWidth;

  const twoRows =
    numOfCards > 3 &&
    availableWidthBesidesBoard < oneRowWidthNeeded &&
    availableWidthBesidesBoard >= twoRowsWidthNeeded;

  useEffect(() => {
    const updateSize = () => {
      if (boardRef.current) {
        setBoardWidth(boardRef.current.offsetWidth);
      }
      setContainerWidth(window.innerWidth);
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: 'fit-content',
        minWidth: '100%',
        mt: 1,
      }}
    >
      <AnimationOverlay />
      <EventAnimationOverlay />
      <GameEndOverlay />

      <ActionBar />

      <PlayCardHandler />
      <EarnMoneyHandler />
      <ChangeCardHandler />

      <Box
        sx={{
          display: 'flex',
          width: '100%',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flex: 1,
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            p: 1,
            gap: 1,
          }}
        >
          <Box ref={boardRef} sx={{ display: 'flex' }}>
            <Board />
          </Box>

          <HandCards twoRows={twoRows} />
        </Box>
        <Box
          sx={{
            width: statusWidth,
            display: 'flex',
            flexDirection: 'column',
            paddingTop: 1,
          }}
        >
          <Status />
          <Box
            sx={{
              flex: 1, // fill remaining space
              overflowY: 'auto', // scrollable if needed
              p: 1,
            }}
          >
            {/* Historie can go here */}
          </Box>
        </Box>
      </Box>

      <PhaseEvaluation />
    </Box>
  );
}
