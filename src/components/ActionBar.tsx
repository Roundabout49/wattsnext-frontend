import { Box, Button, Typography, Stack } from '@mui/material';
import { useGame } from '../context/GameContext';
import { useAction } from '../context/ActionContext';
import { ActionKind, actionKinds } from '../types/Actions';
import { usePlayer } from '../context/PlayerContext';
import { ActionHandlers, actionUIConfig } from '../ui/actionConfig';

const ActionBar = () => {
  const { game: gameState } = useGame();
  const { currentPlayerId, players } = gameState;
  const { playerId } = usePlayer();

  const { selectedAction, setSelectedAction, actionState, dispatchGameAction } = useAction();

  const isCurrentPlayer = currentPlayerId === playerId;
  const currentPlayerName =
    players.find((p) => p.id === currentPlayerId)?.name || 'Unbekannter Spieler';

  const actionLabels: Record<Exclude<ActionKind, null>, string> = {
    playCard: 'Karte ausspielen',
    earnMoney: 'Geld verdienen',
    /*discardCards: 'Karten abwerfen',
     searchDeck: 'Nach Karte suchen',*/
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
      // TODO: Limit actions based on game state
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
        minHeight: 40,
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
