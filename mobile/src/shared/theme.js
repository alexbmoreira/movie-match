import { DefaultTheme } from 'react-native-paper';

const space = '#202139';
const charcoal = '#384259';
const slate = '#708090';
const sky = '#87CEEB';
const alice = '#F0F8FF';
const forest = '#228B22';
const firetruck = '#B22222';

const theme = {
  ...DefaultTheme,
  roundness: 10,
  colors: {
    ...DefaultTheme.colors,
    primary: sky,
    accent: slate,
    surface: charcoal,
    text: alice,
    background: space,
    screen: space,
    backdrop: charcoal,
    error: firetruck,
    like: forest,
    dislike: firetruck
  },
};

export default theme;
