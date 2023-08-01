from django.contrib import admin
from django.urls import path, include

from rest_framework import routers
from GdsSystem.api import viewsets as ProjetosViewsets
from .views import UserCreateView

route = routers.DefaultRouter()
route.register(r'projetos', ProjetosViewsets.ProjetosViewset, basename="Projetos")
route.register(r'conteudos', ProjetosViewsets.ConteudosViewset, basename="Conteudos")
route.register(r'graus_aplicacao', ProjetosViewsets.GrauAplicacaoViewset, basename="Graus aplicação")
route.register(r'series', ProjetosViewsets.GrauAplicacaoViewset, basename="Series")
route.register(r'disciplinas', ProjetosViewsets.GrauAplicacaoViewset, basename="Disciplinas")
route.register(r'publicos', ProjetosViewsets.PublicoViewset, basename="Publicos")
route.register(r'usuarios', ProjetosViewsets.UsuariosViewset, basename="Usuarios")
route.register(r'ao_redor', ProjetosViewsets.AoRedorViewSet , basename="aoRedor")
route.register(r'gostam', ProjetosViewsets.GostamViewSet, basename="Gostam")
route.register(r'conteudo_aplicado', ProjetosViewsets.ConteudoAplicadoViewSet, basename="conteudoAplicado")
route.register(r'jogadores', ProjetosViewsets.JogadoresViewSet, basename="Jogadores")
route.register(r'recursos', ProjetosViewsets.RecursosViewSet, basename="Recursos")
route.register(r'configuracao_espaco', ProjetosViewsets.ConfiguracaoEspacoViewSet, basename="ConfiguracaoEspaco")
route.register(r'professor_aluno', ProjetosViewsets.ProfessorAlunoViewSet, basename="ProfessorAluno")
route.register(r'disponibilidade_tec', ProjetosViewsets.DisponibilidadeTecViewSet, basename="DisponibilidadeTec")
route.register(r'normas_regras', ProjetosViewsets.NormasRegrasViewSet, basename="NormasRegras")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(route.urls)),
    path('users/create/', UserCreateView.as_view(), name="user_create"),
]