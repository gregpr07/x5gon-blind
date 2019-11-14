from app import views
from django.urls import path

urlpatterns = [
    path('users/', views.example.as_view()),
    path('materials/', views.allResources.as_view()),
    path('recommendations/<str:hash>', views.personalReccomendations.as_view()),
    path('recommendations/learn/<str:name>/',
         views.trainingReccomendations.as_view()),
    path('user/<str:name>/<str:material>/<int:eng>/',
         views.updateLearner.as_view()),
    path('login/', views.loginWOpass.as_view()),
    path('test/', views.test.as_view())
]
