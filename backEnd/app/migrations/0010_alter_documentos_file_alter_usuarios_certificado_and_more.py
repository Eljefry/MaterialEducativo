# Generated by Django 4.2 on 2024-07-22 20:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0009_alter_documentos_file_alter_usuarios_certificado_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='documentos',
            name='file',
            field=models.FileField(upload_to='documents'),
        ),
        migrations.AlterField(
            model_name='usuarios',
            name='certificado',
            field=models.FileField(upload_to='certificates'),
        ),
        migrations.AlterField(
            model_name='usuarios',
            name='foto',
            field=models.ImageField(blank=True, null=True, upload_to='photos'),
        ),
    ]