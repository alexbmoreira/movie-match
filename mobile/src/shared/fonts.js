import { createIconSet } from '@expo/vector-icons';

const glyphMap = {
  'add-to-watchlist': '',
  'search': '',
  'settings': '',
  'user': '',
  'match-cards': '',
};

const expoAssetId = require('assets/fonts/match-cut.ttf');
const MatchCutIcons = createIconSet(glyphMap, 'MatchCutFont', expoAssetId);

export {
  MatchCutIcons
};
