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

class ProfileView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        user = self.get_object()
        profile_data = request.data.get('profile', {})
        
        # Atualiza os dados do perfil do usuário, caso existam
        if hasattr(user, 'profile'):
            user.profile.bio = profile_data.get('bio', user.profile.bio)
            user.profile.save()

        return Response({'message': 'Perfil atualizado com sucesso!'})
