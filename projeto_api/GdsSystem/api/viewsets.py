from rest_framework import viewsets
from .serializers import *
from ..models import *

class ProjetosViewset(viewsets.ModelViewSet):
    serializer_class = ProjetosSerializer
    queryset = Projetos.objects.all()

class ConteudosViewset(viewsets.ModelViewSet):
    serializer_class = ConteudosSerializer
    queryset = Conteudos.objects.all()

class GrauAplicacaoViewset(viewsets.ModelViewSet):
    serializer_class = GrauAplicacaoSerializer
    queryset = GrauAplicacao.objects.all()

class PublicoViewset(viewsets.ModelViewSet):
    serializer_class = PublicoSerializer
    queryset = Publico.objects.all()

class UsuariosViewset(viewsets.ModelViewSet):
    serializer_class = UsuariosSerializer
    queryset = Usuario.objects.all()

class ConteudoAplicadoViewSet(viewsets.ModelViewSet):
    serializer_class = ConteudoAplicadoSerializer
    queryset = ConteudoAplicado.objects.all()
class AoRedorViewSet(viewsets.ModelViewSet):
    queryset = AoRedor.objects.all()
    serializer_class = AoRedorSerializer

class GostamViewSet(viewsets.ModelViewSet):
    queryset = Gostam.objects.all()
    serializer_class = GostamSerializer

class JogadoresViewSet(viewsets.ModelViewSet):
    queryset = Jogadores.objects.all()
    serializer_class = JogadoresSerializer