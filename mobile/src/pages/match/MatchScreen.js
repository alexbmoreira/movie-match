import { ScreenContainer, Title } from 'components/common';
import _ from 'lodash';
import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import { theme, withState } from 'shared';
import MovieCard from './MovieCard';
import MatchScreenState from './state/MatchScreenState';

const _style = StyleSheet.create({
  matchScreen: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '90%'
  },
  cardStack: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    width: 350,
    height: 490,
    backgroundColor: theme.colors.backdrop,
    borderRadius: theme.roundness,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity:0.5,
  },
});

const MatchScreen = observer(({ uiState }) => {
  const { jointWatchlist } = uiState;
  return (
    <ScreenContainer style>
      <Title>Match Screen</Title>
      <View style={_style.matchScreen}>
        <CardStack
          style={_style.cardStack}
          verticalSwipe={false}
        >
          {_.map(jointWatchlist, movie => {
            return (
              <Card
                key={movie.id}
                style={_style.card}
                onSwipedRight={() => uiState.likeMovie(movie)}
                onSwipedLeft={() => uiState.dislikeMovie(movie)}
              >
                <MovieCard movie={movie}/>
              </Card>
            );
          })}
        </CardStack></View>
    </ScreenContainer>
  );
});

export default withState(MatchScreen, MatchScreenState);
