import { useState, useEffect } from 'react';
import { Box, Button, Typography, Stack } from '@mui/material';
import { useGame } from '../context/GameContext';
import { useAction } from '../context/ActionContext';
import { ActionKind, actionKinds } from '../types/Actions';

const ActionBar = () => {
  const { gameState } = useGame();
  const { currentPlayerName } = gameState;
  const [playerName, setPlayerName] = useState<string | null>(null);

  const { selectedAction, setSelectedAction, actionState } = useAction();

  useEffect(() => {
    const storedName = localStorage.getItem('playerName');
    if (storedName) {
      setPlayerName(storedName);
    }
  }, []);

  const isCurrentPlayer = currentPlayerName === playerName;

  const renderActionInstruction = () => {
    if (!actionState) return null;

    switch (actionState.type) {
      case 'playCard':
        switch (actionState.step) {
          case 'selectCard':
            return 'Wähle eine Karte aus deiner Hand.';
          case 'selectPosition':
            return 'Wähle eine Position, um die Karte zu spielen.';
          case 'waitIfRecoverPossible':
            return 'Warte auf Informationen zur Ressourcenrückgewinnung...';
          case 'selectRecoverResources':
            return 'Möchtest du Ressourcen zurückerhalten?';
          case 'confirm':
            return 'Bestätige deinen Spielzug.';
          default:
            return null;
        }
      // TODO: Add other actions
      default:
        return null;
    }
  };

  const renderOwnTurn = () => {
    if (!selectedAction) {
      // TODO: Limit actions based on game state
      const actionLabels: Record<Exclude<ActionKind, null>, string> = {
        playCard: 'Karte ausspielen',
        earnMoney: 'Geld verdienen',
        /*discardCards: 'Karten abwerfen',
        searchDeck: 'Nach Karte suchen',*/
      };
      return (
        <>
          <Typography variant="body1" sx={{ mr: 2 }}>
            Du bist am Zug. Wähle eine Aktion:
          </Typography>
          <Stack direction="row" spacing={1}>
            {actionKinds.map((action) => (
              <Button key={action} variant="contained" onClick={() => setSelectedAction(action)}>
                {actionLabels[action]}
              </Button>
            ))}
          </Stack>
        </>
      );
    } else {
      return (
        <>
          <Typography variant="body1" sx={{ mr: 2 }}>
            {renderActionInstruction()}
          </Typography>
          <Button variant="contained" color="error" onClick={() => setSelectedAction(null)}>
            Abbrechen
          </Button>
        </>
      );
    }
  };

  const renderOtherTurn = () => {
    if (!selectedAction) {
      return <Typography variant="body1">{currentPlayerName} ist am Zug.</Typography>;
    } else {
      return (
        <Typography variant="body1">
          {currentPlayerName} führt gerade die Aktion&nbsp;
          <strong>{selectedAction}</strong> aus.
        </Typography>
      );
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: 'lightgrey',
        padding: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: 2,
      }}
    >
      {currentPlayerName ? (
        isCurrentPlayer ? (
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            {renderOwnTurn()}
          </Box>
        ) : (
          renderOtherTurn()
        )
      ) : (
        <Typography variant="body1">Kein Spielername</Typography>
      )}
    </Box>
  );
};

export default ActionBar;
