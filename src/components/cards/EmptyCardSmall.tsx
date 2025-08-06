import CardWrapperSmall, { Highlight } from './CardWrapperSmall';

interface EmptyCardSmallProps {
  highlight?: Highlight;
  onClick?: () => void;
}

const EmptyCardSmall: React.FC<EmptyCardSmallProps> = ({ highlight, onClick }) => {
  return <CardWrapperSmall highlight={highlight} onClick={onClick} />;
};

export default EmptyCardSmall;
