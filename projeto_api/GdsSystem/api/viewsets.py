from rest_framework import viewsets
from GdsSystem.api.serializers import ProjetosSerializer
from GdsSystem.models import Projetos

class ProjetosViewset(viewsets.ModelViewSet):
    serializer_class = ProjetosSerializer
    queryset = Projetos.objects.all()
