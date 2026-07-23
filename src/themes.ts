import { createTheme } from '@mui/material/styles';

// Palette sampled directly from the game board illustration (src/assets/images/Spielbrett.png).
// uiBlue is a calmer, darker sibling of energyBlue (same ~201° hue) used for UI chrome,
// while energyBlue/panel* stay reserved for the board-mimicking illustration.
export const boardColors = {
  uiBlue: '#23678F', // calmer board blue for controls, NavBar, favicon
  uiBlueDark: '#164B6B', // darkest contour (icon hub)
  energyBlue: '#0B83C2', // wind turbines
  panelLine: '#097CBE', // solar panel grid lines
  panelFace: '#1F9EDE', // solar panel faces
  sky: '#7CD3F4', // sky
  skyLight: '#E6F6FD', // lightened sky, used for the own hand-cards area
  cloud: '#A2DFF2', // clouds
  grassLight: '#93CC3B', // hill highlights
  grass: '#77BD34', // hill shadows (strong green)
  sun: '#FEDD19', // sun — decorative only, never on controls
};

// Single light theme (no dark mode in this project).
// primary.light/dark are derived by MUI from main for consistent hover/active states.
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: boardColors.uiBlue,
    },
    secondary: {
      main: boardColors.grass,
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});
