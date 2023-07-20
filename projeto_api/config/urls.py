from django.contrib import admin
from django.urls import path, include

from rest_framework import routers
route = routers.DefaultRouter()
from GdsSystem.api import viewsets as ProjetosViewsets

route.register(r'projetos', ProjetosViewsets.ProjetosViewset , basename="Projetos")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(route.urls)),
    
]
