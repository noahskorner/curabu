# Generated by Django 3.1.7 on 2021-05-01 18:50

from django.db import migrations, models
import taylors_book_club.models


class Migration(migrations.Migration):

    dependencies = [
        ('taylors_book_club', '0003_auto_20210501_1735'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=taylors_book_club.models.get_book_image_path),
        ),
    ]