from django.db import models

# Create your models here.

class Conteudos(models.Model):
    descricao = models.CharField(max_length=225)
    create_at = models.DateField(auto_now_add=True)

class GrauAplicacao(models.Model):
    descricao = models.CharField(max_length=225)
    create_at = models.DateField(auto_now_add=True)

class Publico(models.Model):
    descricao = models.CharField(max_length=225)
    create_at = models.DateField(auto_now_add=True)

class Usuario(models.Model):
    nome = models.CharField(max_length=225)
    create_at = models.DateField(auto_now_add=True)

class Projetos(models.Model):
    
    titulo = models.CharField(max_length=225)
    descricao = models.CharField(max_length=225)
    url_imagem = models.CharField(max_length=225, null=True)
    conteudo = models.ForeignKey(Conteudos, on_delete=models.CASCADE )
    grauAplicacao = models.ForeignKey(GrauAplicacao, on_delete=models.CASCADE)
    publico = models.ForeignKey(Publico, on_delete=models.CASCADE)

    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)

    create_at = models.DateField(auto_now_add=True)
