# Generated by Django 2.1.15 on 2020-06-17 13:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('community', '0002_auto_20200617_1949'),
    ]

    operations = [
        migrations.AlterField(
            model_name='review',
            name='rating',
            field=models.CharField(max_length=1),
        ),
    ]
