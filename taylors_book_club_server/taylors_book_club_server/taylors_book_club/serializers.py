from rest_framework import serializers

from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'is_superuser',
                  'is_staff', 'is_active', 'date_joined']


class BookSerializer(serializers.ModelSerializer):
    image_url = serializers.ReadOnlyField()

    class Meta:
        model = Book
        fields = ['id', 'name', 'author', 'isbn', 'num_pages', 'image_url']


class ClubBookSerializer(serializers.ModelSerializer):
    book = BookSerializer(many=False)

    class Meta:
        model = ClubBook
        fields = ['id', 'book', 'start_date', 'end_date']


class ClubSerializer(serializers.ModelSerializer):
    members = UserSerializer(many=True)
    owner = UserSerializer()
    current_book = ClubBookSerializer()
    past_books = ClubBookSerializer(many=True)
    name_url = serializers.ReadOnlyField()

    class Meta:
        model = Club
        fields = ['id', 'name', 'members',
                  'owner', 'genre', 'current_book', 'past_books', 'name_url']
