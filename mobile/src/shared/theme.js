import { DefaultTheme } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  roundness: 10,
  colors: {
    ...DefaultTheme.colors,
    primary: '#495C9C',
    accent: '#F2C649',
    surface: '#7D7E88',
    text: '#E2E2E2',
    background: '#404142'
  },
};

export default theme;
