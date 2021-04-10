from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _
from . import *
from .managers import CustomUserManager


class CustomUser(AbstractUser):
    username = None
    email = models.EmailField(_('email address'), unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    spouse_name = models.CharField(blank=True, max_length=100)
    date_of_birth = models.DateField(blank=True, null=True)

    def __str__(self):
        return self.email


class Club(models.Model):
    name = models.CharField(max_length=25, null=False, blank=False)
    members = models.ManyToManyField(CustomUser, related_name="Members")
    owner = models.ForeignKey(
        CustomUser, on_delete=models.SET_NULL, null=True, related_name="Owner")
    genre = models.CharField(choices=GENRE_CHOICES, max_length=50)


class Book(models.Model):
    name = models.CharField(max_length=50, null=False, blank=False)
    author = models.CharField(max_length=25, null=True, blank=True)
    isbn = models.CharField(max_length=25, null=True, blank=True)
    num_pages = models.PositiveIntegerField()
    image = models.ImageField(null=True, blank=True, upload_to='images/')

    @ property
    def imageURL(self):
        try:
            url = self.image.url
        except:
            url = ''
        return url
