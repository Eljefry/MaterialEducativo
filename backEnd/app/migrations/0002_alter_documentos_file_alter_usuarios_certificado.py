# Generated by Django 4.2 on 2024-07-18 21:58

import django.core.files.storage
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='documentos',
            name='file',
            field=models.FileField(storage=django.core.files.storage.FileSystemStorage(location='media/documents'), upload_to=''),
        ),
        migrations.AlterField(
            model_name='usuarios',
            name='certificado',
            field=models.FileField(storage=django.core.files.storage.FileSystemStorage(location='media/certificates'), upload_to=''),
        ),
    ]
