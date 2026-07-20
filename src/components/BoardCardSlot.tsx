import { ProgressCard } from '../types/ProgressCards';
import { getBoardPositionDomId } from '../utils/cardDomId';
import ProgressCardSmall from './cards/ProgressCardSmall';
import EmptyCardSmall from './cards/EmptyCardSmall';
import { Highlight } from './cards/CardWrapperSmall';

interface BoardCardSlotProps {
  card: ProgressCard | null;
  area: string;
  index: number;
  registerCardRef: (id: string, el: HTMLDivElement | null) => void;
  highlight?: Highlight;
  onClick?: () => void;
}

export default function BoardCardSlot({
  card,
  area,
  index,
  registerCardRef,
  highlight,
  onClick,
}: BoardCardSlotProps) {
  return (
    <div
      ref={(el) => {
        if (el) registerCardRef(getBoardPositionDomId(area, index), el);
      }}
    >
      {card ? (
        <ProgressCardSmall card={card} highlight={highlight} onClick={onClick} />
      ) : (
        <EmptyCardSmall highlight={highlight} onClick={onClick} />
      )}
    </div>
  );
}
