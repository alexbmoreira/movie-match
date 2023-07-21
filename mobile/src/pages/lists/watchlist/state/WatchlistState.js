class WatchlistState {
  route;
  navigation;
  userId;

  receiveProps({ route, navigation }) {
    this.route = route;
    this.navigation = navigation;
    this.userId = route.params.userId;
  }
}

export default WatchlistState;
