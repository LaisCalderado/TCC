from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from ..models import Profile
from ..models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'bio']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        
        user = self.user
        data['user'] = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
        }

        return data
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

class ConteudosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conteudos
        fields = '__all__'
class GrauAplicacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = GrauAplicacao
        fields = '__all__'

class SeriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Series
        fields = '__all__'

class DisciplinasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Disciplinas
        fields = '__all__'
class JogadoresSerializer(serializers.ModelSerializer):
    class Meta:
        model = Jogadores
        fields = '__all__'

class EstiloAprendizagemSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstiloAprendizagem
        fields = '__all__'

class InteressesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interesses
        fields = '__all__'

class HabilidadesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Habilidades
        fields = '__all__'


class RecursosFisicosSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecursosFisicos
        fields = '__all__'

class LimitacoesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Limitacoes
        fields = '__all__'
class PublicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publico
        fields = '__all__'

class ConteudoAplicadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConteudoAplicado
        fields = '__all__'



class GostamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gostam
        fields = '__all__'

class RecompensasVirtuaisSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecompensasVirtuais
        fields = '__all__'

class CompeticoesDesafiosSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompeticoesDesafios
        fields = '__all__'
class AoRedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = AoRedor
        fields = '__all__'
class RecursosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recursos
        fields = '__all__'

class ConfiguracaoEspacoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConfiguracaoEspaco
        fields = '__all__'

class ProfessorAlunoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfessorAluno
        fields = '__all__'

class DisponibilidadeTecSerializer(serializers.ModelSerializer):
    class Meta:
        model = DisponibilidadeTec
        fields = '__all__'

class NormasRegrasSerializer(serializers.ModelSerializer):
    class Meta:
        model = NormasRegras
        fields = '__all__'

class TemasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Temas
        fields = '__all__'



class PerguntaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pergunta
        fields = '__all__'
class ProjetosSerializer(serializers.ModelSerializer):
    i_grauAplicacao = GrauAplicacaoSerializer(source='grauAplicacao', read_only=True)
    i_series = SeriesSerializer(source='series', read_only=True)
    i_disciplinas = DisciplinasSerializer(source='disciplinas', read_only=True)
    i_estilo_aprendizagem = EstiloAprendizagemSerializer(source='estilo_aprendizagem', read_only=True)
    i_interesses = InteressesSerializer(source='interesses', read_only=True)
    i_habilidades = HabilidadesSerializer(source='habilidades', read_only=True)
    i_recompensasVirtuais = RecompensasVirtuaisSerializer(source='recompensasVirtuais', read_only=True)
    i_competicaoDesafios = CompeticoesDesafiosSerializer(source='competicaoDesafios', read_only=True)
    i_recursos = RecursosSerializer(source='recursos', read_only=True)
    i_configuracaoespaco = ConfiguracaoEspacoSerializer(source='configuracaoespaco', read_only=True)
    i_professorAluno = ProfessorAlunoSerializer(source='professorAluno', read_only=True)
    i_disponibilidadeTec = DisponibilidadeTecSerializer(source='disponibilidadeTec', read_only=True)
    i_normasRegras = NormasRegrasSerializer(source='normasRegras', read_only=True)
    
    class Meta:
        model = Projetos
        fields = '__all__'