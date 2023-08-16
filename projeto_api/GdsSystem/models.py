from django.db import models
# Create your models here.

# para o profile
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


class Usuario(models.Model):
    nome = models.CharField(max_length=225)
    create_at = models.DateField(auto_now_add=True)
    
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    #avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    bio = models.TextField(blank=True)

    def __str__(self):
        return self.user.username

@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_profile(sender, instance, **kwargs):
    instance.profile.save()


class Conteudos(models.Model):
    descricao = models.CharField(max_length=225)
    create_at = models.DateField(auto_now_add=True)

class ConteudoAplicado(models.Model):
    nome = models.CharField(max_length=225)
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

class Jogadores(models.Model):
    nome = models.CharField(max_length=225)
    create_at = models.DateField(auto_now_add=True)

class EstiloAprendizagem(models.Model):
    nome = models.CharField(max_length=225)
    create_at = models.DateField(auto_now_add=True)

class Interesses(models.Model):
    nome = models.CharField(max_length=225)
    create_at = models.DateField(auto_now_add=True)

class Habilidades(models.Model):
    nome = models.CharField(max_length=225)
    create_at = models.DateField(auto_now_add=True)

class Gostam(models.Model):
    descricao = models.CharField(max_length=225)
    create_at = models.DateField(auto_now_add=True)

class RecompensasVirtuais(models.Model):
    descricao = models.CharField(max_length=225)
    create_at = models.DateField(auto_now_add=True)
    
class CompeticoesDesafios(models.Model):
    descricao = models.CharField(max_length=225)
    create_at = models.DateField(auto_now_add=True)
    
class AoRedor(models.Model):
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

class RecursosFisicos(models.Model):
    descricao = models.CharField(max_length=225)
    create_at = models.DateField(auto_now_add=True)

class Limitacoes(models.Model):
    descricao = models.CharField(max_length=225)
    create_at = models.DateField(auto_now_add=True)

class Temas(models.Model):
    descricao = models.CharField(max_length=225)
    create_at = models.DateField(auto_now_add=True)
    
class Publico(models.Model):
    descricao = models.CharField(max_length=225)
    create_at = models.DateField(auto_now_add=True)



class Pergunta(models.Model):
    tema = models.CharField(max_length=100)
    pergunta = models.TextField()
    resposta = models.TextField()

    def __str__(self):
        return f"{self.tema}: {self.pergunta}"


class Projetos(models.Model):
    titulo = models.CharField(max_length=225)
    descricao = models.CharField(max_length=225)
    url_imagem = models.CharField(max_length=225, null=True)
    conteudo = models.ForeignKey(Conteudos, on_delete=models.CASCADE, null=True)
    grauAplicacao = models.ForeignKey(GrauAplicacao, on_delete=models.CASCADE, null=True)
    series = models.ForeignKey(Series, on_delete=models.CASCADE, null=True)
    disciplinas = models.ForeignKey(Disciplinas, on_delete=models.CASCADE, null=True)
    estilo_aprendizagem = models.ForeignKey(EstiloAprendizagem, on_delete=models.CASCADE, null=True)
    interesses = models.ForeignKey(Interesses, on_delete=models.CASCADE, null=True)
    habilidades = models.ForeignKey(Habilidades, on_delete=models.CASCADE, null=True)
    recompensasVirtuais = models.ForeignKey(RecompensasVirtuais, on_delete=models.CASCADE, null=True)
    competicaoDesafios = models.ForeignKey(CompeticoesDesafios, on_delete=models.CASCADE, null=True)
    recursos = models.ForeignKey(Recursos, on_delete=models.CASCADE, null=True)
    configuracaoespaco = models.ForeignKey(ConfiguracaoEspaco, on_delete=models.CASCADE, null=True)
    professorAluno = models.ForeignKey(ProfessorAluno, on_delete=models.CASCADE, null=True)
    disponibilidadeTec = models.ForeignKey(DisponibilidadeTec, on_delete=models.CASCADE, null=True)
    normasRegras = models.ForeignKey(NormasRegras, on_delete=models.CASCADE, null=True)
    publico = models.ForeignKey(Publico, on_delete=models.CASCADE, null=True)

    usuario = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    
    create_at = models.DateField(auto_now_add=True, null=True)