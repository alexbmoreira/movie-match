import { ScreenContainer, UsernameWithAvatar } from 'components/common';
import _ from 'lodash';
import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import { theme, withState } from 'shared';
import { DislikeIcon, LikeIcon } from 'shared/icons';
import { Surface, Text } from '../../components/common';
import MovieCard from './MovieCard';
import MatchScreenState from './state/MatchScreenState';

const _style = StyleSheet.create({
  matchScreen: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 480
  },
  cardStack: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    width: 336,
    height: 470,
    backgroundColor: theme.colors.backdrop,
    borderRadius: theme.roundness,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity:0.5,
  },
  userRow: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  actionRow: {
    display: 'flex',
    flexDirection: 'row',
    width: '70%',
    justifyContent: 'space-between',
    alignSelf: 'center'
  }
});

const MatchScreen = observer(({ uiState }) => {
  const { jointWatchlist, friend, swiperRef } = uiState;
  return (
    <ScreenContainer>
      <View style={_style.userRow}>
        <UsernameWithAvatar user={friend} size='lg'/>
        <Text bold>View Matches</Text>
      </View>
      <View style={_style.matchScreen}>
        <CardStack
          style={_style.cardStack}
          verticalSwipe={false}
          onSwipedRight={(movieIndex) => uiState.likeMovie(movieIndex)}
          onSwipedLeft={(movieIndex) => uiState.dislikeMovie(movieIndex)}
          ref={swiperRef}
        >
          {_.map(jointWatchlist, movie => {
            return (
              <Card
                key={movie.id}
                style={_style.card}
              >
                <MovieCard movie={movie}/>
              </Card>
            );
          })}
        </CardStack>
      </View>
      <View style={_style.actionRow}>
        <Surface.Pressable size='lg' onPress={() => swiperRef.current.swipeLeft()}>
          <DislikeIcon size={36} color={theme.colors.dislike}/>
        </Surface.Pressable>
        <Surface.Pressable size='lg' onPress={() => swiperRef.current.swipeRight()}>
          <LikeIcon size={36} color={theme.colors.like}/>
        </Surface.Pressable>
      </View>
    </ScreenContainer>
  );
});

export default withState(MatchScreen, MatchScreenState);
