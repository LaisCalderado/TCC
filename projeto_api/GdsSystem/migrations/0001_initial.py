# Generated by Django 4.2.3 on 2023-07-20 02:33

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Projetos',
            fields=[
                ('projetos', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('titulo', models.CharField(max_length=225)),
                ('descricao', models.CharField(max_length=225)),
                ('create_at', models.DateField(auto_now_add=True)),
            ],
        ),
    ]
