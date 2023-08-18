from rest_framework import viewsets
from ..models import *
from .serializers import *
from GdsSystem.api import serializers
from GdsSystem import models

class ProjetosViewset(viewsets.ModelViewSet):
    serializer_class = ProjetosSerializer
    
    def get_queryset(self):
        # Obtém o valor do parâmetro 'user' da URL
        id_user = self.request.query_params.get('user', None)
        try: # caso aconteca alguma passagem de parametro com tipos diferentes 
            if id_user:
                # Filtra os Perfils por 'user' caso seja fornecido na URL
                queryset = models.Projetos.objects.filter(usuario=id_user)
            else:
                # Caso 'user' não seja fornecido, retorna todos os produtos
                queryset = models.Projetos.objects.all()
        except Exception:
                queryset = []
        return queryset

class ProfileViewset(viewsets.ModelViewSet):
    serializer_class = serializers.ProfileSerializer
   
    # para filtrar por id do user
    def get_queryset(self):
        # Obtém o valor do parâmetro 'user' da URL
        id_user = self.request.query_params.get('user', None)
        if id_user:
            # Filtra os Perfils por 'user' caso seja fornecido na URL
            queryset = models.Profile.objects.filter(user=id_user)
        else:
            # Caso 'user' não seja fornecido, retorna todos os produtos
            queryset = models.Profile.objects.all()
        return queryset

class ConteudosViewset(viewsets.ModelViewSet):
    serializer_class = ConteudosSerializer
    queryset = Conteudos.objects.all()

class GrauAplicacaoViewset(viewsets.ModelViewSet):
    serializer_class = GrauAplicacaoSerializer
    queryset = GrauAplicacao.objects.all()

class SeriesViewset(viewsets.ModelViewSet):
    serializer_class = SeriesSerializer
    queryset = Series.objects.all()

class DisciplinasViewset(viewsets.ModelViewSet):
    serializer_class = DisciplinasSerializer
    queryset = Disciplinas.objects.all()

class JogadoresViewSet(viewsets.ModelViewSet):
    queryset = Jogadores.objects.all()
    serializer_class = JogadoresSerializer

class EstiloAprendizagemViewSet(viewsets.ModelViewSet):
    queryset = EstiloAprendizagem.objects.all()
    serializer_class = EstiloAprendizagemSerializer

class InteressesViewSet(viewsets.ModelViewSet):
    queryset = Interesses.objects.all()
    serializer_class = InteressesSerializer

class HabilidadesViewSet(viewsets.ModelViewSet):
    queryset = Habilidades.objects.all()
    serializer_class = HabilidadesSerializer


class RecursosFisicosViewset(viewsets.ModelViewSet):
    serializer_class = RecursosFisicosSerializer
    queryset = RecursosFisicos.objects.all()

class LimitacoesViewset(viewsets.ModelViewSet):
    serializer_class = LimitacoesSerializer
    queryset = Limitacoes.objects.all()
class PublicoViewset(viewsets.ModelViewSet):
    serializer_class = PublicoSerializer
    queryset = Publico.objects.all()


class ConteudoAplicadoViewSet(viewsets.ModelViewSet):
    serializer_class = ConteudoAplicadoSerializer
    queryset = ConteudoAplicado.objects.all()

class TemasViewSet(viewsets.ModelViewSet):
    serializer_class = TemasSerializer
    queryset = Temas.objects.all()

class PerguntaViewSet(viewsets.ModelViewSet):
    serializer_class = PerguntaSerializer
    queryset = Pergunta.objects.all()

class GostamViewSet(viewsets.ModelViewSet):
    queryset = Gostam.objects.all()
    serializer_class = GostamSerializer
class RecompensasVirtuaisViewSet(viewsets.ModelViewSet):
    queryset = RecompensasVirtuais.objects.all()
    serializer_class = RecompensasVirtuaisSerializer

class CompeticoesDesafiosViewSet(viewsets.ModelViewSet):
    queryset = CompeticoesDesafios.objects.all()
    serializer_class = CompeticoesDesafiosSerializer

class AoRedorViewSet(viewsets.ModelViewSet):
    queryset = AoRedor.objects.all()
    serializer_class = AoRedorSerializer
class RecursosViewSet(viewsets.ModelViewSet):
    queryset = Recursos.objects.all()
    serializer_class = RecursosSerializer

class ConfiguracaoEspacoViewSet(viewsets.ModelViewSet):
    queryset = ConfiguracaoEspaco.objects.all()
    serializer_class = ConfiguracaoEspacoSerializer

class ProfessorAlunoViewSet(viewsets.ModelViewSet):
    queryset = ProfessorAluno.objects.all()
    serializer_class = ProfessorAlunoSerializer

class DisponibilidadeTecViewSet(viewsets.ModelViewSet):
    queryset = DisponibilidadeTec.objects.all()
    serializer_class = DisponibilidadeTecSerializer

class NormasRegrasViewSet(viewsets.ModelViewSet):
    queryset = NormasRegras.objects.all()
    serializer_class = NormasRegrasSerializer