import { JSX } from 'react';
import { ActionState } from '../types/Actions';
import { CancelActionButton } from '../components/CancelActionButton';
import { ConfirmActionButton } from '../components/ConfirmActionButton';
import { Button } from '@mui/material';

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
      instruction: () => 'Warte auf Informationen zur Ressourcenrückgewinnung...',
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
    done: {
      instruction: (actionState) =>
        actionState.type === 'earnMoney' ? `Du hast ${actionState.amount} Geld verdient.` : '',
      buttons: () => [],
    },
  },
};
