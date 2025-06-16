import { Box } from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';

const FlyingCard: React.FC<{
  fromRect: DOMRect;
  toRect: DOMRect;
  content: ReactNode;
  onDone: () => void;
}> = ({ fromRect, toRect, content, onDone }) => {
  const [style, setStyle] = useState<React.CSSProperties>({
    position: 'fixed',
    top: fromRect.top,
    left: fromRect.left,
    width: fromRect.width,
    height: fromRect.height,
    transition: 'all 0.5s ease-in-out',
    zIndex: 1000,
  });

  useEffect(() => {
    requestAnimationFrame(() => {
      setStyle((prev) => ({
        ...prev,
        top: toRect.top,
        left: toRect.left,
        width: toRect.width,
        height: toRect.height,
      }));
    });
  }, [toRect]);

  return (
    <Box sx={style} onTransitionEnd={onDone}>
      {content}
    </Box>
  );
};

export default FlyingCard;
