import { EffectType } from '../../types/EventCards';
import EnergySystemIcon from './EnergySystemIcon';
import MoneyAndResourcesIcon from './MoneyAndResourcesIcon';
import PointsIcon from './PointsIcon';

// Renders the icon that marks an event effect of the given type on the card.
const EffectTypeIcon: React.FC<{ type: EffectType; size?: number }> = ({ type, size = 34 }) => {
  switch (type) {
    case 'MoneyAndResources':
      return <MoneyAndResourcesIcon size={size} />;
    case 'Points':
      return <PointsIcon leafColor="green" />;
    case 'EnergySystem':
      return <EnergySystemIcon size={size} />;
    default:
      return null;
  }
};

export default EffectTypeIcon;
