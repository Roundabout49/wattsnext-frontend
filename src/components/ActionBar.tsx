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
import { ActionKind, realActionKinds } from '../types/Actions';
import { useSession } from '../context/SessionContext';
import { ActionHandlers, actionUIConfig } from '../ui/actionConfig';
import { useState } from 'react';
import { useGameApi } from '../context/GameApiContext';

const ActionBar = () => {
  const { game: gameState } = useGame();
  const { currentPlayerId, players } = gameState!;
  const { gameId, playerId, clearSession } = useSession();
  const gameApi = useGameApi();

  const {
    selectedAction,
    setSelectedAction,
    actionState,
    dispatchGameAction,
    inChangeCardPhase,
    setInChangeCardPhase,
    resolutionMessage,
  } = useAction();

  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const isCurrentPlayer = currentPlayerId === playerId;
  const currentPlayerName =
    players.find((p) => p.id === currentPlayerId)?.name || 'Unbekannter Spieler';

  const canChangeCard = (gameState?.money ?? 0) >= 1;

  const actionLabels: Record<Exclude<ActionKind, null>, string> = {
    playCard: 'Karte ausspielen',
    earnMoney: 'Geld verdienen',
    changeCard: 'Karte tauschen',
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
      } else if (actionState?.type === 'changeCard' && actionState.step === 'confirm') {
        dispatchGameAction({
          type: 'CHANGE_CARD_CONFIRM',
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
    if (!selectedAction && inChangeCardPhase && canChangeCard) {
      return (
        <>
          <Typography variant="body1" sx={{ mr: 2 }}>
            Du bist am Zug. Zuerst eine Handkarte für 1 Geld austauschen?
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button variant="contained" onClick={() => setSelectedAction('changeCard')}>
              Karte tauschen
            </Button>
            <Button variant="contained" onClick={() => setInChangeCardPhase(false)}>
              Überspringen
            </Button>
          </Stack>
        </>
      );
    } else if (!selectedAction) {
      return (
        <>
          <Typography variant="body1" sx={{ mr: 2 }}>
            Du bist am Zug. Wähle eine Aktion:
          </Typography>
          <Stack direction="row" spacing={1}>
            {realActionKinds.map((action) => (
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
          display: 'grid',
          gridTemplateColumns: 'minmax(0, max-content) 1fr max-content',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          boxShadow: 2,
          minHeight: 40,
          whiteSpace: 'nowrap',
        }}
      >
        <Box sx={{ gridColumn: 1 }} />

        <Box
          sx={{ gridColumn: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
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

                // While the previous action resolves, show what happened instead
                // of jumping straight to the next turn prompt.
                if (resolutionMessage && !selectedAction) {
                  return <Typography variant="body1">{resolutionMessage}</Typography>;
                }

                return isCurrentPlayer ? (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      flexWrap: 'nowrap',
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
        </Box>

        {gameState!.state === 'Running' && (
          <Box sx={{ gridColumn: 3 }}>
            <IconButton
              color="error"
              onClick={() => setShowCancelConfirm(true)}
              title="Spiel abbrechen"
            >
              <CancelIcon />
            </IconButton>
          </Box>
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
