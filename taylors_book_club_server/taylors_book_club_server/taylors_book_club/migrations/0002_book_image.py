# Generated by Django 3.1.7 on 2021-04-10 20:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('taylors_book_club', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]