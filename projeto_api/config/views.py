from rest_framework import generics, status
from django.contrib.auth.models import User
from .serializers import UserSerializer, ProfileSerializer
from .serializers import CustomTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from GdsSystem.models import Profile
from django.contrib.auth.hashers import make_password
from rest_framework.response import Response


class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
