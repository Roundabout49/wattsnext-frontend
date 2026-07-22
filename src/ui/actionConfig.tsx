import { JSX } from 'react';
import { ActionState } from '../types/Actions';
import { CancelActionButton } from '../components/CancelActionButton';
import { ConfirmActionButton } from '../components/ConfirmActionButton';
import { Button } from '@mui/material';
import { GAME_VARIANT } from '../gameConfig';

type ActionUIElement = {
  instruction: (actionState: ActionState) => string;
  buttons: (
    onResetAction: () => void,
    actionState: ActionState | null,
    handlers: ActionHandlers
  ) => JSX.Element[];
};

export type ActionHandlers = {
  onRecoverChoice?: (recover: boolean) => void;
  onConfirmAction?: () => void;
};

type ActionUIConfig = {
  [key in ActionState['type']]?: {
    [step: string]: ActionUIElement;
  };
};

export const actionUIConfig: ActionUIConfig = {
  playCard: {
    selectCard: {
      instruction: () => 'Wähle eine Karte aus deiner Hand.',
      buttons: (resetAction) => [<CancelActionButton key="cancel" onCancel={resetAction} />],
    },
    selectPosition: {
      instruction: () => 'Wähle eine Position, um die Karte zu spielen.',
      buttons: (resetAction) => [<CancelActionButton key="cancel" onCancel={resetAction} />],
    },
    waitIfRecoverPossible: {
      instruction: () =>
        GAME_VARIANT === 'advanced'
          ? 'Warte auf Informationen zur Ressourcenrückgewinnung...'
          : 'Spielzug wird geprüft...',
      buttons: () => [],
    },
    selectRecoverResources: {
      instruction: () => 'Möchtest du Ressourcen zurückerhalten?',
      buttons: (resetAction, _, handlers) => [
        <Button
          key="yes"
          color="primary"
          variant="contained"
          onClick={() => handlers.onRecoverChoice?.(true)}
        >
          Ja
        </Button>,
        <Button
          key="no"
          color="primary"
          variant="contained"
          onClick={() => handlers.onRecoverChoice?.(false)}
        >
          Nein
        </Button>,
        <CancelActionButton key="cancel" onCancel={resetAction} />,
      ],
    },
    confirm: {
      instruction: () => 'Bestätige deinen Spielzug.',
      buttons: (resetAction, _, handlers) => [
        <CancelActionButton key="cancel" onCancel={resetAction} />,
        <ConfirmActionButton key="confirm" onConfirm={() => handlers.onConfirmAction?.()} />,
      ],
    },
  },

  earnMoney: {
    confirm: {
      instruction: () => 'Bestätige, dass du Geld verdienen möchtest.',
      buttons: (resetAction, _, handlers) => [
        <CancelActionButton key="cancel" onCancel={resetAction} />,
        <ConfirmActionButton key="confirm" onConfirm={() => handlers.onConfirmAction?.()} />,
      ],
    },
    waitForGameState: {
      instruction: () => 'Würfeln ...',
      buttons: () => [],
    },
    animateDie: {
      instruction: () => 'Würfeln ...',
      buttons: () => [],
    },
    // The "done" step shows nothing; the status-bar resolution message reports the result.
  },

  changeCard: {
    selectCard: {
      instruction: () => 'Wähle eine Karte, die du abwerfen möchtest.',
      buttons: (resetAction) => [<CancelActionButton key="cancel" onCancel={resetAction} />],
    },
    confirm: {
      instruction: () => 'Bestätige, dass du die Karte tauschen möchtest.',
      buttons: (resetAction, _, handlers) => [
        <CancelActionButton key="cancel" onCancel={resetAction} />,
        <ConfirmActionButton key="confirm" onConfirm={() => handlers.onConfirmAction?.()} />,
      ],
    },
    waitForGameState: {
      instruction: () => 'Warte auf den Kartentausch...',
      buttons: () => [],
    },
    // The "done" step shows nothing; the status-bar resolution message reports the result.
  },
};
