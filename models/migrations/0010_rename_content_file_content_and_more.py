# Generated by Django 4.2.4 on 2023-09-01 18:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('models', '0009_remove_file_contentname'),
    ]

    operations = [
        migrations.RenameField(
            model_name='file',
            old_name='Content',
            new_name='content',
        ),
        migrations.RenameField(
            model_name='file',
            old_name='Curator',
            new_name='curator',
        ),
        migrations.RenameField(
            model_name='file',
            old_name='Semester',
            new_name='semester',
        ),
    ]
