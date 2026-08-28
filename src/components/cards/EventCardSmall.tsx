import React from 'react';
import { CardContent, Typography, Box, Popover } from '@mui/material';
import EventCardLarge from './EventCardLarge';
import { EventCard } from '../../types/EventCards';
import CardWrapperSmall from './CardWrapperSmall';
import { eventCardNameFontSize, eventCardTextScale } from '../../utils/eventCardTextScale';

const EventCardSmall: React.FC<{ card: EventCard }> = ({ card }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const headerColor = card.isCatastrophe ? '#b30000' : '#2c9aff';
  const { bodyFontSize, rowSpacing } = eventCardTextScale(card, false);

  return (
    <div>
      <CardWrapperSmall onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
        <Box
          sx={{
            width: 225,
            height: 320,
            transform: 'scale(0.5)',
            transformOrigin: 'top left',
            backgroundColor: '#c7edffff',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              backgroundColor: headerColor,
              color: 'white',
              padding: 0.5,
              textAlign: 'center',
            }}
          >
            <Typography variant="h6" sx={{ fontSize: '1rem' }}>
              {card.isCatastrophe ? 'Katastrophe' : 'Ereignis'}
            </Typography>
          </Box>

          <CardContent
            sx={{
              padding: 1,
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              justifyContent: 'flex-start',
              '&:last-child': {
                paddingBottom: 1,
              },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                textAlign: 'center',
                color: '#1565c0',
                fontSize: eventCardNameFontSize(card),
              }}
            >
              {card.name}
            </Typography>

            <Box sx={{ marginTop: 'auto' }}>
              {card.effectConditionDescription && (
                <Typography
                  variant="body2"
                  sx={{
                    textAlign: 'left',
                    marginBottom: rowSpacing,
                    lineHeight: 1.3,
                    fontSize: bodyFontSize,
                  }}
                >
                  {card.effectConditionDescription}
                </Typography>
              )}

              <Box>
                {card.effectDescriptions.map((effect, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      marginBottom: rowSpacing,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ lineHeight: 1.3, fontStyle: 'italic', fontSize: bodyFontSize }}
                    >
                      {effect.text}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </CardContent>
        </Box>
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
        <EventCardLarge card={card}></EventCardLarge>
      </Popover>
    </div>
  );
};

export default EventCardSmall;
