# Generated by Django 2.1.15 on 2020-06-17 10:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('community', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='review',
            name='rating',
            field=models.IntegerField(max_length=1),
        ),
    ]