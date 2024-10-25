# Generated by Django 4.2 on 2024-10-19 18:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0021_categoria'),
    ]

    operations = [
        migrations.AddField(
            model_name='documentos',
            name='categoria',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.RESTRICT, related_name='Categoria', to='app.categoria'),
            preserve_default=False,
        ),
    ]