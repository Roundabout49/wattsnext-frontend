import React from 'react';
import { Card, CardContent, Typography, Box, Popover } from '@mui/material';
import { TechnologyTypes } from '../types/TechnologyTypes';
import ProgressCardTop from './ProgressCardTop';
import ProgressCard from './ProgressCard';
import { ClimateActionCardProps, TechnologyCardProps } from '../types/ProgressCards';

const ProgressCardSmall: React.FC<{ card: TechnologyCardProps | ClimateActionCardProps }> = ({
  card,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const color =
    card.type === 'technology'
      ? TechnologyTypes[card.energyCharacteristics.technology].color
      : 'green';
  return (
    <div>
      <Card
        sx={{ width: 112, height: 200, position: 'relative', padding: 0 }}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <Box
          sx={{
            transform: 'scale(0.5)',
            transformOrigin: 'top left',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          {card.type === 'technology' ? (
            <ProgressCardTop
              card={{
                title: card.title,
                image: card.image,
                price: card.price,
                resources: card.resources,
                type: card.type,
                energyCharacteristics: card.energyCharacteristics,
              }}
            ></ProgressCardTop>
          ) : (
            <ProgressCardTop
              card={{
                title: card.title,
                image: card.image,
                price: card.price,
                resources: card.resources,
                type: card.type,
                icon: card.icon,
              }}
            ></ProgressCardTop>
          )}
        </Box>
        <CardContent sx={{ padding: 0 }}>
          <Box
            sx={{
              backgroundColor: color,
              padding: 0.5,
              textAlign: 'center',
              marginTop: 1,
              marginBottom: 1,
              position: 'absolute',
              top: 75,
              left: 0,
              height: 30,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h6" sx={{ fontSize: '0.7rem', lineHeight: 1 }}>
              {card.title}
            </Typography>
          </Box>
          <Typography
            variant="body2"
            sx={{
              marginLeft: 0.5,
              marginRight: 0.5,
              lineHeight: 1,
              fontSize: '0.5rem',
              position: 'absolute',
              top: 120,
              left: 0,
            }}
          >
            {card.text}
          </Typography>
        </CardContent>
      </Card>
      <Popover
        id="mouse-over-popover"
        sx={{ pointerEvents: 'none' }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <ProgressCard card={card}></ProgressCard>
      </Popover>
    </div>
  );
};

export default ProgressCardSmall;
