import { FC, ReactNode } from 'react';
import { Box, Typography } from '@mui/material';
import SpaIcon from '@mui/icons-material/Spa';
import { ModifiableValue, ProgressCard } from '../../types/ProgressCards';
import EnergySystemIcon from '../icons/EnergySystemIcon';

interface ModificationRow {
  icon: ReactNode;
  detail?: string;
  sources: string[];
}

const moneyIcon = (
  <Box sx={{ width: 18, height: 18, borderRadius: '50%', backgroundColor: '#d4972b', border: '1.5px solid black' }} />
);
const resourceIcon = (
  <Box sx={{ width: 18, height: 18, backgroundColor: '#8a8a8a', border: '1.5px solid black' }} />
);
const pointsIcon = <SpaIcon sx={{ color: 'green', fontSize: 20 }} />;
const supplyIcon = <EnergySystemIcon size={22} />;

const CardModifications: FC<{ card: ProgressCard }> = ({ card }) => {
  const rows: ModificationRow[] = [];

  const addCostRow = (icon: ReactNode, value: ModifiableValue<number>) => {
    if (value.modifications.length === 0) return;
    const diff = value.modifiedValue - value.originalValue;
    const sign = diff > 0 ? '+' : '−';
    rows.push({ icon, detail: `${sign}${Math.abs(diff)}`, sources: value.modifications.map((m) => m.name) });
  };

  addCostRow(moneyIcon, card.moneyCosts);
  addCostRow(resourceIcon, card.resourceCosts);

  if (card.supply.modifications.length > 0) {
    rows.push({ icon: supplyIcon, sources: card.supply.modifications.map((m) => m.name) });
  }

  if (card.points && card.points.modifications.length > 0) {
    const original = card.points.originalValue.conditions ?? [];
    const modified = card.points.modifiedValue.conditions ?? [];
    const blocked = modified.some((cond) => cond.type === 'never');
    const guaranteed = original.length > 0 && modified.length === 0;
    const detail = blocked
      ? 'Systempunkte blockiert'
      : guaranteed
        ? 'Systempunkte garantiert'
        : 'Systempunkte';
    rows.push({ icon: pointsIcon, detail, sources: card.points.modifications.map((m) => m.name) });
  }

  if (rows.length === 0) return null;

  return (
    // Grey panel tucked behind the card: the card overlaps its top edge (negative margin +
    // matching top padding) so only the lower part peeks out, like a pulled-out drawer.
    <Box
      sx={{
        width: 225,
        mt: '-10px',
        pt: '18px',
        px: 1,
        pb: 1,
        backgroundColor: 'grey.300',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        position: 'relative',
        zIndex: 0,
      }}
    >
      {rows.map((row, index) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.25 }}>
          <Box sx={{ width: 22, display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
            {row.icon}
          </Box>
          <Typography variant="caption" sx={{ lineHeight: 1.3 }}>
            {row.detail ? `${row.detail} · ` : ''}
            {row.sources.join(', ')}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default CardModifications;
