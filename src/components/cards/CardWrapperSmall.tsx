import React from 'react';
import { Card, useTheme } from '@mui/material';

export type Highlight = 'selectable' | 'selected' | 'notSelected' | undefined;

interface CardWrapperSmallProps {
  highlight?: Highlight;
  onClick?: () => void;
  onMouseEnter?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLElement>) => void;
  children?: React.ReactNode;
}

const CardWrapperSmall: React.FC<CardWrapperSmallProps> = ({
  highlight,
  onClick,
  onMouseEnter,
  onMouseLeave,
  children,
}) => {
  const theme = useTheme();

  return (
    <Card
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      sx={{
        width: 112,
        height: 160,
        position: 'relative',
        padding: 0,
        boxShadow:
          highlight === 'selected'
            ? `0 0 0 3px ${theme.palette.success.main}`
            : highlight === 'selectable'
              ? `0 0 0 3px ${theme.palette.primary.main}`
              : highlight === 'notSelected'
                ? `0 0 0 3px ${theme.palette.grey[400]}`
                : undefined,
        borderRadius: 1,
        cursor: onClick ? 'pointer' : 'default',
        boxSizing: 'border-box',
      }}
    >
      {children}
    </Card>
  );
};

export default CardWrapperSmall;
