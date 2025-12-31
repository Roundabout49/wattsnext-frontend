import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { EventCard } from '../../types/EventCards';

const EventCardLarge: React.FC<{ card: EventCard }> = ({ card }) => {
  const headerColor = card.isCatastrophe ? '#b30000' : '#2c9aff';

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
                marginBottom: 1,
                lineHeight: 1.3,
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
                  marginBottom: 1,
                }}
              >
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    backgroundColor: '#bbdefb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    flexShrink: 0,
                  }}
                >
                  {/* Platzhalter-Icon */}?
                </Box>
                <Typography variant="body2" sx={{ lineHeight: 1.3 }}>
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
