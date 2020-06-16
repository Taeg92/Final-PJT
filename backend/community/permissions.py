from rest_framework import permissions

class IsSuperUser(permissions.BasePermission):
    def has_super_permission(self, request, view):
        return request.user.is_superuser