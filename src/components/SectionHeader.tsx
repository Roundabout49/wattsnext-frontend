interface SectionHeaderProps {
  label: string;
  color: string;
  width?: number;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ label, color, width = 112 }) => {
  return (
    <div
      style={{
        backgroundColor: color,
        padding: '4px 8px',
        borderRadius: 4,
        fontSize: '1.2rem',
        fontWeight: 500,
        textAlign: 'center',
        marginBottom: '4px',
        width: width,
        boxSizing: 'border-box',
      }}
    >
      {label}
    </div>
  );
};

export default SectionHeader;
