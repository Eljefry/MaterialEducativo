# Generated by Django 4.2 on 2024-11-02 20:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0022_categoria_remove_documentos_materia'),
    ]

    operations = [
        migrations.AddField(
            model_name='documentos',
            name='categoria',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.RESTRICT, related_name='Categoria', to='app.categoria'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='documentos',
            name='materia',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.RESTRICT, related_name='Materia', to='app.materia'),
            preserve_default=False,
        ),
    ]