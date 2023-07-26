from django.contrib.auth.models import User
from rest_framework import serializers

from ..models import *

class ProjetosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projetos
        fields = '__all__'

class ConteudosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conteudos
        fields = '__all__'

class GrauAplicacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = GrauAplicacao
        fields = '__all__'

class PublicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publico
        fields = '__all__'

class UsuariosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'


class ConteudoAplicadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConteudoAplicado
        fields = '__all__'

class JogadoresSerializer(serializers.ModelSerializer):
    class Meta:
        model = Jogadores
        fields = '__all__'

class AoRedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = AoRedor
        fields = '__all__'

class GostamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gostam
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
