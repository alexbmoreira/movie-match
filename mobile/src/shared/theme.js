import { DefaultTheme } from 'react-native-paper';

const space = '#12192D'; // bg
const charcoal = '#2A3A57'; // secondary
const slate = '#7A8B99'; // tertiary
const sky = '#F2B705'; // action
const alice = '#E6E6E6'; // text
const forest = '#2A9D8F'; // like
const firetruck = '#E63946'; // dislike

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
