# Generated by Django 4.2.3 on 2023-07-14 08:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='spam',
            field=models.BooleanField(default=False),
        ),
    ]
