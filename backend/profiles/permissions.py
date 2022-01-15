from rest_framework import permissions

from .models import Friendship


class IsUser(permissions.BasePermission):
    """
    Permission to check that the request user is the user
    associated with the object being modified.
    """

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True

        return int(view.kwargs['user_id']) == request.user.id

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.user == request.user


class IsFriend(permissions.BasePermission):
    """
    Permission to check that the request user is the user
    associated with the object being modified.
    """

    def has_permission(self, request, view):
        return Friendship.objects.get_friendship(request.user.id, view.kwargs['user_id'])

    def has_object_permission(self, request, view, obj):
        return obj.user == request.user or obj.friend == request.user
