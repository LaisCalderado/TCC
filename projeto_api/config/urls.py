from django.contrib import admin
from django.urls import path, include

from rest_framework import routers
from GdsSystem.api import viewsets as ProjetosViewsets
from .views import UserCreateView

route = routers.DefaultRouter()
route.register(r'projetos', ProjetosViewsets.ProjetosViewset, basename="Projetos")
route.register(r'conteudos', ProjetosViewsets.ConteudosViewset, basename="Conteudos")
route.register(r'graus_aplicacao', ProjetosViewsets.GrauAplicacaoViewset, basename="Graus aplicação")
route.register(r'publicos', ProjetosViewsets.PublicoViewset, basename="Publicos")
route.register(r'usuarios', ProjetosViewsets.UsuariosViewset, basename="Usuarios")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(route.urls)),
    path('users/create/', UserCreateView.as_view(), name="user_create"),
]