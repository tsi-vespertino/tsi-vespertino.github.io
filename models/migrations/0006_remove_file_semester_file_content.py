# Generated by Django 4.2.4 on 2023-09-01 01:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('models', '0005_rename_curatorid_file_curator_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='file',
            name='Semester',
        ),
        migrations.AddField(
            model_name='file',
            name='Content',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='models.content', verbose_name='Semester ID'),
            preserve_default=False,
        ),
    ]
