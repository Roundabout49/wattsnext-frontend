import {
  Box,
  Button,
  Typography,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { useGame } from '../context/GameContext';
import { useAction } from '../context/ActionContext';
import { ActionKind, actionKinds } from '../types/Actions';
import { useSession } from '../context/SessionContext';
import { ActionHandlers, actionUIConfig } from '../ui/actionConfig';
import { useState } from 'react';
import { useGameApi } from '../context/GameApiContext';

const ActionBar = () => {
  const { game: gameState } = useGame();
  const { currentPlayerId, players } = gameState!;
  const { gameId, playerId, clearSession } = useSession();
  const gameApi = useGameApi();

  const { selectedAction, setSelectedAction, actionState, dispatchGameAction } = useAction();

  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const isCurrentPlayer = currentPlayerId === playerId;
  const currentPlayerName =
    players.find((p) => p.id === currentPlayerId)?.name || 'Unbekannter Spieler';

  const actionLabels: Record<Exclude<ActionKind, null>, string> = {
    playCard: 'Karte ausspielen',
    earnMoney: 'Geld verdienen',
  };

  const handleCancelGame = () => {
    if (!gameId || !playerId) return;
    try {
      gameApi.cancelGame({ gameId, playerId });
    } catch (err) {
      console.error(err);
    }
  };

  const handleLeaveCancelledGame = () => {
    clearSession();
    window.location.reload();
  };

  const resetAction = () => setSelectedAction(null);

  const handlers: ActionHandlers = {
    onRecoverChoice: (recover: boolean) => {
      if (actionState?.type === 'playCard' && actionState.step === 'selectRecoverResources') {
        dispatchGameAction({
          type: 'PLAY_CARD_SELECT_RECOVER_RESOURCES',
          recover,
        });
      }
    },
    onConfirmAction: () => {
      if (actionState?.type === 'playCard' && actionState.step === 'confirm') {
        dispatchGameAction({
          type: 'PLAY_CARD_CONFIRM',
        });
      } else if (actionState?.type === 'earnMoney' && actionState.step === 'confirm') {
        dispatchGameAction({
          type: 'EARN_MONEY_CONFIRM',
        });
      }
    },
  };

  const LeaveFinishedGameButton = () => (
    <Button variant="contained" onClick={() => handleLeaveCancelledGame()}>
      Verlassen
    </Button>
  );

  const renderSelectedAction = () => {
    if (!actionState) return null;
    const config = actionUIConfig[actionState.type]?.[actionState.step];
    if (!config) return null;

    return (
      <>
        <Typography variant="body1" sx={{ mr: 2 }}>
          {config.instruction(actionState)}
        </Typography>
        <Stack direction="row" spacing={1}>
          {config.buttons(resetAction, actionState, handlers)}
        </Stack>
      </>
    );
  };

  const renderOwnTurn = () => {
    if (!selectedAction) {
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
      return renderSelectedAction();
    }
  };

  const renderOtherTurn = () => {
    if (!selectedAction) {
      return <Typography variant="body1">{currentPlayerName} ist am Zug.</Typography>;
    } else {
      return (
        <Typography variant="body1">
          {currentPlayerName} führt gerade die Aktion&nbsp;
          <strong>{actionLabels[selectedAction]}</strong> aus.
        </Typography>
      );
    }
  };

  const renderWon = () => {
    return (
      <>
        <Typography variant="body1" sx={{ mr: 2 }}>
          🎉 Ihr habt das Spiel gewonnen!
        </Typography>
        <LeaveFinishedGameButton />
      </>
    );
  };

  const renderLost = () => {
    return (
      <>
        <Typography variant="body1" sx={{ mr: 2 }}>
          😢 Ihr habt das Spiel verloren.
        </Typography>
        <LeaveFinishedGameButton />
      </>
    );
  };

  const renderCancelled = () => {
    return (
      <>
        <Typography variant="body1" sx={{ mr: 2 }}>
          Das Spiel wurde abgebrochen.
        </Typography>
        <LeaveFinishedGameButton />
      </>
    );
  };

  return (
    <>
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
          minHeight: 40,
        }}
      >
        {(() => {
          switch (gameState!.state) {
            case 'Cancelled':
              return renderCancelled();

            case 'Won':
              return renderWon();

            case 'Lost':
              return renderLost();

            case 'Running':
            default:
              if (!currentPlayerName) {
                return <Typography variant="body1">Kein Spielername</Typography>;
              }

              return isCurrentPlayer ? (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 2,
                  }}
                >
                  {renderOwnTurn()}
                </Box>
              ) : (
                renderOtherTurn()
              );
          }
        })()}

        {gameState!.state === 'Running' && (
          <IconButton
            color="error"
            onClick={() => setShowCancelConfirm(true)}
            sx={{
              position: 'absolute',
              right: 8,
              top: '50%',
              transform: 'translateY(-50%)',
            }}
            title="Spiel abbrechen"
          >
            <CancelIcon />
          </IconButton>
        )}
      </Box>

      <Dialog open={showCancelConfirm} onClose={() => setShowCancelConfirm(false)}>
        <DialogTitle>Spiel abbrechen?</DialogTitle>
        <DialogContent>
          Bist du sicher, dass du das laufende Spiel abbrechen möchtest? Dies kann nicht rückgängig
          gemacht werden.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowCancelConfirm(false)}>Zurück zum Spiel</Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => {
              handleCancelGame();
              setShowCancelConfirm(false);
            }}
          >
            Spiel abbrechen
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ActionBar;
