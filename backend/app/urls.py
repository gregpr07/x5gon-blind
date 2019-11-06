from app import views
from django.urls import path

urlpatterns = [
    path('users/', views.example.as_view()),
]
