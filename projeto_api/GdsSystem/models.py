from django.db import models

# Create your models here.

class Conteudos(models.Model):
    descricao = models.CharField(max_length=225)
    create_at = models.DateField(auto_now_add=True)

class GrauAplicacao(models.Model):
    descricao = models.CharField(max_length=225)
    create_at = models.DateField(auto_now_add=True)

class Series(models.Model):
    descricao = models.CharField(max_length=225)
    create_at = models.DateField(auto_now_add=True)

class Disciplinas(models.Model):
    descricao = models.CharField(max_length=225)
    create_at = models.DateField(auto_now_add=True)

class Publico(models.Model):
    descricao = models.CharField(max_length=225)
    create_at = models.DateField(auto_now_add=True)

class Usuario(models.Model):
    nome = models.CharField(max_length=225)
    create_at = models.DateField(auto_now_add=True)


class ConteudoAplicado(models.Model):
    nome = models.CharField(max_length=225)
    create_at = models.DateField(auto_now_add=True)

class Jogadores(models.Model):
    nome = models.CharField(max_length=225)
    create_at = models.DateField(auto_now_add=True)

class AoRedor(models.Model):
    descricao = models.CharField(max_length=225)
    create_at = models.DateField(auto_now_add=True)

class Gostam(models.Model):
    descricao = models.CharField(max_length=225)
    create_at = models.DateField(auto_now_add=True)

class Recursos(models.Model):
    descricao = models.CharField(max_length=225)
    create_at = models.DateField(auto_now_add=True)

class ConfiguracaoEspaco(models.Model):
    descricao = models.CharField(max_length=225)
    create_at = models.DateField(auto_now_add=True)

class ProfessorAluno(models.Model):
    descricao = models.CharField(max_length=225)
    create_at = models.DateField(auto_now_add=True)

class DisponibilidadeTec(models.Model):
    descricao = models.CharField(max_length=225)
    create_at = models.DateField(auto_now_add=True)

class NormasRegras(models.Model):
    descricao = models.CharField(max_length=225)
    create_at = models.DateField(auto_now_add=True)

class Projetos(models.Model):
    titulo = models.CharField(max_length=225)
    descricao = models.CharField(max_length=225)
    url_imagem = models.CharField(max_length=225, null=True)
    conteudo = models.ForeignKey(Conteudos, on_delete=models.CASCADE)
    grauAplicacao = models.ForeignKey(GrauAplicacao, on_delete=models.CASCADE)
    series = models.ForeignKey(Series, on_delete=models.CASCADE)
    disciplinas = models.ForeignKey(Disciplinas, on_delete=models.CASCADE)
    publico = models.ForeignKey(Publico, on_delete=models.CASCADE)

    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    
    create_at = models.DateField(auto_now_add=True)