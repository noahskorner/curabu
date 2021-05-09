from django.urls import path
from . import views

urlpatterns = [
    path('clubs/', views.clubs, name="clubs"),
    path('club/', views.club, name="club"),
    path('post/', views.post, name="post")
]
