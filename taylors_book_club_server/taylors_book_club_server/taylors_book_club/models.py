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

    def __str__(self):
        return self.email


def get_book_image_path(book, filename):
    return f'images/books/{filename}'


class Book(models.Model):
    name = models.CharField(max_length=50, null=False, blank=False)
    author = models.CharField(max_length=25, null=False, blank=False)
    isbn = models.CharField(max_length=25, null=True, blank=True)
    num_pages = models.PositiveIntegerField()
    image = models.ImageField(null=True, blank=True,
                              upload_to=get_book_image_path)

    @ property
    def image_url(self):
        try:
            url = self.image.url
        except:
            url = ''
        return url


class ClubBook(models.Model):
    book = models.ForeignKey(Book, null=False, on_delete=models.CASCADE)
    start_date = models.DateField(auto_now_add=True)
    end_date = models.DateField(null=True, blank=True, auto_now_add=False)


class Club(models.Model):
    name = models.CharField(max_length=25, unique=True,
                            null=False, blank=False)
    members = models.ManyToManyField(CustomUser, related_name="Members")
    owner = models.ForeignKey(
        CustomUser, on_delete=models.SET_NULL, null=True, related_name="Owner")
    genre = models.CharField(choices=GENRE_CHOICES, max_length=50)
    current_book = models.OneToOneField(
        ClubBook, on_delete=models.SET_NULL, related_name="CurrentBook", null=True)
    past_books = models.ManyToManyField(ClubBook, related_name="PastBooks")

    @property
    def name_url(self):
        return self.name.lower().replace(" ", "-")
