from rest_framework import permissions


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
