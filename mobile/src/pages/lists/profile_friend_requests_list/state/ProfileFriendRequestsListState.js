import { deleteRequest, postRequest } from 'api';
import { action, computed, makeObservable } from 'mobx';
import { endpoints } from 'shared';
import theme from 'shared/theme';

class ProfileFriendRequestsListState {
  constructor() {
    makeObservable(this, {
      deleteFriendRequest: action.bound,
      acceptFriendRequest: action.bound,
      quickActions: computed
    });
  }

  async acceptFriendRequest(friendRequest) {
    await postRequest(endpoints.FRIEND_REQUEST.ACCEPT.with(friendRequest.id));
  }

  async deleteFriendRequest(friendRequest) {
    await deleteRequest(endpoints.FRIEND_REQUEST.with(friendRequest.id));
  }

  get quickActions() {
    return [
      {
        onPress: friendRequest => this.deleteFriendRequest(friendRequest),
        text: 'Decline',
        style: {
          backgroundColor: theme.colors.dislike
        }
      },
      {
        onPress: friendRequest => this.acceptFriendRequest(friendRequest),
        text: 'Accept',
        style: {
          backgroundColor: theme.colors.like
        }
      }
    ];
  }
}

export default ProfileFriendRequestsListState;
