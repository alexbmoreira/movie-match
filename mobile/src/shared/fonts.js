import { createIconSet } from '@expo/vector-icons';

const glyphMap = {
  'match-cards': ''
};

const expoAssetId = require('assets/fonts/match-cut.ttf');
const MatchCutIcons = createIconSet(glyphMap, 'MatchCutFont', expoAssetId);

export {
  MatchCutIcons
};
