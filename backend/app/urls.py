from app import views
from django.urls import path

urlpatterns = [
    path('uporabniki/', views.example.as_view()),
    path('vsebine/', views.allResources.as_view()),
    path('priporocila/<str:name>/', views.personalReccomendations.as_view()),
    path('priporocila/ucenje/<str:name>/',
         views.trainingReccomendations.as_view()),
    path('uporabnik/<str:name>/<str:material>/<int:eng>/',
         views.trainingReccomendations.as_view()),
    path('prijava/<str:name>/', views.loginWOpass.as_view())
]
