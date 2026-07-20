import { Stack } from '@mui/material';
import SectionHeader from './SectionHeader';
import BoardCardSlot from './BoardCardSlot';
import { ProgressCard } from '../types/ProgressCards';
import { TechnologyType } from '../types/TechnologyTypes';
import { Highlight } from './cards/CardWrapperSmall';

interface TechnologyColumnProps {
  label: string;
  color: string;
  technologyType: TechnologyType;
  cards: (ProgressCard | null)[];
  selectedCard: ProgressCard | null;
  isCurrentPlayer: boolean;
  selectedPosition: number | null;
  onSelectPosition: (index: number) => void;
  registerCardRef: (id: string, el: HTMLDivElement | null) => void;
}

export default function TechnologyColumn({
  label,
  color,
  technologyType,
  cards,
  selectedCard,
  isCurrentPlayer,
  selectedPosition,
  onSelectPosition,
  registerCardRef,
}: TechnologyColumnProps) {
  const isSelectable =
    isCurrentPlayer &&
    selectedCard?.type === 'technology' &&
    selectedCard.supply.modifiedValue.technology === technologyType;

  return (
    <Stack spacing={1}>
      <SectionHeader label={label} color={color} />
      {cards.map((card, index) => {
        const selected = isSelectable && selectedPosition === index;
        const anySelected = isSelectable && selectedPosition !== null;
        const highlight: Highlight | undefined = selected
          ? 'selected'
          : anySelected
            ? 'notSelected'
            : isSelectable
              ? 'selectable'
              : undefined;

        return (
          <BoardCardSlot
            key={index}
            card={card}
            area={technologyType}
            index={index}
            registerCardRef={registerCardRef}
            highlight={highlight}
            onClick={isSelectable ? () => onSelectPosition(index) : undefined}
          />
        );
      })}
    </Stack>
  );
}
