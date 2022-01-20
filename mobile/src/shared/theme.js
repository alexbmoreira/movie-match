import { DefaultTheme } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  roundness: 10,
  colors: {
    ...DefaultTheme.colors,
    primary: '#8ac3f2',
    accent: '#F2C649',
    surface: '#7D7E88',
    text: '#E2E2E2',
    background: '#7D7E88',
    screen: '#404142',
    backdrop: '#363838',
    error: '#B30D02',
    like: '#8dd952',
    dislike: '#B30D02'
  },
};

export default theme;
