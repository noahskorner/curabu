from django.urls import path
from . import views

urlpatterns = [
    path('clubs/', views.clubs, name="clubs"),
    path('post/', views.post, name="post")
]
