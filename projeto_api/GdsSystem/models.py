from django.db import models
from uuid import uuid4

# Create your models here.

class Projetos(models.Model):
    projetos = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    titulo = models.CharField(max_length=225)
    descricao = models.CharField(max_length=225)
    create_at = models.DateField(auto_now_add=True)
