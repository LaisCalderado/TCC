from rest_framework import viewsets
from ..models import *
from .serializers import *

class ProjetosViewset(viewsets.ModelViewSet):
    serializer_class = ProjetosSerializer
    queryset = Projetos.objects.all()

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

class AoRedorViewSet(viewsets.ModelViewSet):
    queryset = AoRedor.objects.all()
    serializer_class = AoRedorSerializer

class RecursosFisicosViewset(viewsets.ModelViewSet):
    serializer_class = RecursosFisicosSerializer
    queryset = RecursosFisicos.objects.all()

class LimitacoesViewset(viewsets.ModelViewSet):
    serializer_class = LimitacoesSerializer
    queryset = Limitacoes.objects.all()
class PublicoViewset(viewsets.ModelViewSet):
    serializer_class = PublicoSerializer
    queryset = Publico.objects.all()

class UsuariosViewset(viewsets.ModelViewSet):
    serializer_class = UsuariosSerializer
    queryset = Usuario.objects.all()

class ConteudoAplicadoViewSet(viewsets.ModelViewSet):
    serializer_class = ConteudoAplicadoSerializer
    queryset = ConteudoAplicado.objects.all()

class GostamViewSet(viewsets.ModelViewSet):
    queryset = Gostam.objects.all()
    serializer_class = GostamSerializer
class RecompensasVirtuaisViewSet(viewsets.ModelViewSet):
    queryset = RecompensasVirtuais.objects.all()
    serializer_class = RecompensasVirtuaisSerializer

class CompeticoesDesafiosViewSet(viewsets.ModelViewSet):
    queryset = CompeticoesDesafios.objects.all()
    serializer_class = CompeticoesDesafiosSerializer

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