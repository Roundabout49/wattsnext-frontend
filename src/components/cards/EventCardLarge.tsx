import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { EventCard } from '../../types/EventCards';
import EffectTypeIcon from '../icons/EffectTypeIcon';
import { eventCardTextScale } from '../../utils/eventCardTextScale';

const EventCardLarge: React.FC<{ card: EventCard }> = ({ card }) => {
  const headerColor = card.isCatastrophe ? '#b30000' : '#2c9aff';
  const { bodyFontSize, effectIconSize, rowSpacing } = eventCardTextScale(card, true);

  return (
    <Card
      sx={{
        width: 225,
        height: 400,
        position: 'relative',
        backgroundColor: '#c7edff',
        display: 'flex',
        flexDirection: 'column',
        padding: 0,
      }}
    >
      {/* Header */}
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
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          justifyContent: 'flex-start',
          padding: 1,
          paddingBottom: 0,
          '&:last-child': {
            paddingBottom: 1,
          },
        }}
      >
        {/* Name + Description */}
        <Box sx={{ marginX: 0.5 }}>
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              color: '#1565c0',
              marginTop: 0,
              fontSize: '1rem',
            }}
          >
            {card.name}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              textAlign: 'center',
              lineHeight: 1.3,
              fontSize: bodyFontSize,
            }}
          >
            {card.eventDescription}
          </Typography>
        </Box>

        {/* Condition + Effects (aligned at bottom) */}
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
                <Box
                  sx={{
                    width: effectIconSize,
                    height: effectIconSize,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <EffectTypeIcon type={effect.type} />
                </Box>
                <Typography variant="body2" sx={{ lineHeight: 1.3, fontSize: bodyFontSize }}>
                  {effect.text}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EventCardLarge;
