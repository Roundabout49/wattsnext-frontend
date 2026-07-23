import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

// Wind turbine logo mark, mirroring public/windrad.svg.
// Uses currentColor so it inherits text color (e.g. white in the NavBar).
export default function WindradIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 32 32" {...props}>
      <rect x="14.5" y="14.5" width="3" height="16" rx="1.5" />
      <g transform="rotate(18 16 15)">
        <ellipse cx="16" cy="7.8" rx="2.3" ry="7.2" />
        <ellipse cx="16" cy="7.8" rx="2.3" ry="7.2" transform="rotate(120 16 15)" />
        <ellipse cx="16" cy="7.8" rx="2.3" ry="7.2" transform="rotate(240 16 15)" />
      </g>
      <circle cx="16" cy="15" r="2.5" />
    </SvgIcon>
  );
}
