# Generated by Django 4.2.4 on 2023-09-06 00:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('models', '0011_alter_content_semester'),
    ]

    operations = [
        migrations.RenameField(
            model_name='file',
            old_name='senderName',
            new_name='sender',
        ),
        migrations.RemoveField(
            model_name='file',
            name='semester',
        ),
    ]
