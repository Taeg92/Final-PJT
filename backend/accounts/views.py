from django.shortcuts import render, get_object_or_404
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer
from .models import User
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

class UserInfo(APIView):

    @permission_classes([IsAuthenticated])
    def get(self, request, format=None):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)