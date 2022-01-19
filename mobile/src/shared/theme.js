import { DefaultTheme } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  roundness: 10,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6B93E3',
    accent: '#F2C649',
    surface: '#7D7E88',
    text: '#E2E2E2',
    background: '#7D7E88',
    screen: '#404142',
    backdrop: '#363838',
    error: '#ED1F1F',
    like: '#61BC56',
    dislike: '#BD2F2F'
  },
};

export default theme;
