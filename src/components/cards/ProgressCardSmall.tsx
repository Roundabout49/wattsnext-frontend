import React from 'react';
import { CardContent, Typography, Box, Popover } from '@mui/material';
import { TechnologyTypes } from '../../types/TechnologyTypes';
import ProgressCardTop from './ProgressCardTop';
import ProgressCardLarge from './ProgressCardLarge';
import { ProgressCardProps } from '../../types/ProgressCards';
import CardPoints from './CardPoints';
import CardWrapperSmall, { Highlight } from './CardWrapperSmall';

interface ProgressCardSmallProps {
  card: ProgressCardProps;
  highlight?: Highlight;
  onClick?: () => void;
}

const ProgressCardSmall: React.FC<ProgressCardSmallProps> = ({ card, highlight, onClick }) => {
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
      <CardWrapperSmall
        onClick={onClick}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        highlight={highlight}
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
          <Box
            sx={{
              transform: 'scale(0.5)',
              transformOrigin: 'top left',
              position: 'absolute',
              top: 125,
              left: 0,
              right: 0,
            }}
          >
            {card.points && <CardPoints points={card.points} />}
          </Box>
        </CardContent>
      </CardWrapperSmall>
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
        <ProgressCardLarge card={card}></ProgressCardLarge>
      </Popover>
    </div>
  );
};

export default ProgressCardSmall;
