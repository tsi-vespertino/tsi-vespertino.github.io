# Generated by Django 4.2.4 on 2023-09-01 00:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('models', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='file',
            name='CuratorID',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='file',
            name='semesterID',
            field=models.IntegerField(),
        ),
        migrations.DeleteModel(
            name='Content',
        ),
        migrations.DeleteModel(
            name='Curator',
        ),
    ]
