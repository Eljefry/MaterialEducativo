# Generated by Django 4.2 on 2024-09-24 19:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0014_carpeta_subcarpeta'),
    ]

    operations = [
        migrations.AlterField(
            model_name='carpeta',
            name='updated_at',
            field=models.DateField(auto_now=True, null=True),
        ),
    ]
