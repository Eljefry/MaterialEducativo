# Generated by Django 4.2 on 2024-09-24 19:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0013_merge_20240920_2302'),
    ]

    operations = [
        migrations.AddField(
            model_name='carpeta',
            name='subcarpeta',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='app.carpeta'),
        ),
    ]
