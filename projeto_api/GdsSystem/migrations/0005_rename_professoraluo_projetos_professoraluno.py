# Generated by Django 4.2.3 on 2023-08-05 01:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('GdsSystem', '0004_projetos_configuracaoespaco_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='projetos',
            old_name='professorAluo',
            new_name='professorAluno',
        ),
    ]
