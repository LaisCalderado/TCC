from django.contrib import admin
from django.urls import path, include

from rest_framework import routers
from GdsSystem.api import viewsets as ProjetosViewsets
from .views import UserCreateView

route = routers.DefaultRouter()
route.register(r'projetos', ProjetosViewsets.ProjetosViewset, basename="Projetos")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(route.urls)),
    path('users/create/', UserCreateView.as_view(), name="user_create"),
]