import { boardColors } from '../themes';

// Decorative energy-transition band in the style of the game board:
// green hills with wind turbines rising out of them, plus a floating sun and clouds.
// Transparent background (no sky box); renders full-width, viewBox 1200x300.

// Slender, tapered rotor blade pointing up from the hub.
const BLADE = 'M0,0 C-3.4,-11 -2.8,-36 0,-46 C2.8,-36 3.4,-11 0,0 Z';

interface PlacementProps {
  x: number;
  y: number;
  scale?: number;
}

interface TurbineProps extends PlacementProps {
  rotation?: number; // rotor angle so no two turbines match
}

// Wind turbine planted at (x, y); the long tapered mast is clipped by the hills drawn on top.
const Turbine = ({ x, y, scale = 1, rotation = 0 }: TurbineProps) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <polygon points="-1.9,0 1.9,0 3.2,140 -3.2,140" fill={boardColors.energyBlue} />
    <g transform={`rotate(${rotation})`} fill={boardColors.energyBlue}>
      <path d={BLADE} />
      <path d={BLADE} transform="rotate(120)" />
      <path d={BLADE} transform="rotate(240)" />
    </g>
    <circle r={3.6} fill={boardColors.panelLine} />
  </g>
);

// Tilted solar panel with a small stand and a grid.
const SolarPanel = ({ x, y, scale = 1 }: PlacementProps) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <rect x={-1.5} y={-2} width={3} height={16} fill={boardColors.panelLine} />
    <rect x={-7} y={13} width={14} height={2.5} rx={1} fill={boardColors.panelLine} />
    <polygon
      points="-16,-13 13,-17 17,-2 -12,2"
      fill={boardColors.panelFace}
      stroke={boardColors.panelLine}
      strokeWidth={1.2}
      strokeLinejoin="round"
    />
    <line x1={-6} y1={-15} x2={-2.5} y2={0.5} stroke={boardColors.panelLine} strokeWidth={0.9} />
    <line x1={3.5} y1={-16} x2={7} y2={-0.5} stroke={boardColors.panelLine} strokeWidth={0.9} />
    <line x1={-14.5} y1={-7.5} x2={15.5} y2={-11} stroke={boardColors.panelLine} strokeWidth={0.9} />
  </g>
);

const Cloud = ({ x, y, scale = 1 }: PlacementProps) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`} fill={boardColors.cloud}>
    <ellipse cx={0} cy={0} rx={26} ry={16} />
    <ellipse cx={-20} cy={6} rx={18} ry={12} />
    <ellipse cx={20} cy={6} rx={18} ry={12} />
  </g>
);

const svgStyle = { display: 'block', width: '100%', height: 'auto' } as const;

// Slim footer variant for secondary pages: just hills and two small turbines.
const MinimalLandscape = () => (
  <svg
    viewBox="0 0 1200 150"
    preserveAspectRatio="xMidYMax meet"
    style={svgStyle}
    role="img"
    aria-label="Illustration einer Hügellandschaft mit Windrädern"
  >
    <path
      d="M0,95 C250,70 500,110 750,86 S1100,70 1200,96 L1200,150 L0,150 Z"
      fill={boardColors.grassLight}
    />
    <Turbine x={270} y={62} scale={0.72} rotation={18} />
    <path
      d="M0,122 C300,102 560,136 800,116 S1100,104 1200,126 L1200,150 L0,150 Z"
      fill={boardColors.grass}
    />
    <Turbine x={935} y={58} scale={1.05} rotation={47} />
  </svg>
);

const FullLandscape = () => (
  <svg
    viewBox="0 0 1200 300"
    preserveAspectRatio="xMidYMax meet"
    style={svgStyle}
    role="img"
    aria-label="Illustration einer Energielandschaft mit Windrädern und Solarpanelen"
  >
    {/* Floating sun and clouds (no sky box) */}
    <g transform="translate(1080 62) scale(0.68)">
      <g fill={boardColors.sun}>
        {Array.from({ length: 8 }).map((_, i) => (
          <rect key={i} x={-3} y={-62} width={6} height={18} rx={3} transform={`rotate(${i * 45})`} />
        ))}
      </g>
      <circle r={30} fill={boardColors.sun} />
    </g>
    <Cloud x={250} y={60} scale={0.9} />
    <Cloud x={640} y={44} scale={0.65} />

    {/* Back hill + distant turbines */}
    <path
      d="M0,205 C200,175 400,225 600,200 S1000,180 1200,205 L1200,300 L0,300 Z"
      fill={boardColors.grassLight}
    />
    <Turbine x={200} y={122} scale={0.85} rotation={20} />
    <Turbine x={770} y={134} scale={0.8} rotation={52} />
    <Turbine x={1010} y={112} scale={0.9} rotation={8} />

    {/* Front hill + close turbines + solar */}
    <path
      d="M0,255 C250,225 450,275 700,250 S1050,235 1200,262 L1200,300 L0,300 Z"
      fill={boardColors.grass}
    />
    <Turbine x={360} y={140} scale={1.5} rotation={34} />
    <Turbine x={880} y={152} scale={1.45} rotation={68} />
    <SolarPanel x={150} y={252} scale={1.6} />
    <SolarPanel x={560} y={264} scale={1.7} />
    <SolarPanel x={1060} y={256} scale={1.55} />
  </svg>
);

interface EnergyLandscapeProps {
  variant?: 'full' | 'minimal';
}

const EnergyLandscape = ({ variant = 'full' }: EnergyLandscapeProps) =>
  variant === 'minimal' ? <MinimalLandscape /> : <FullLandscape />;

export default EnergyLandscape;
