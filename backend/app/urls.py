from app import views
from django.urls import path

urlpatterns = [
    path('users/', views.example.as_view()),
    path('materials/', views.allResources.as_view()),
    path('classroom/<str:name>/', views.personalReccomendations.as_view()),
    path('availableclasses/', views.AvailableClassrooms.as_view()),
    path('allclasses/', views.AllClassrooms.as_view()),
    path('joinclassroom/', views.joinClassroom.as_view()),
    path('recommendations/learn/<str:name>/',
         views.trainingReccomendations.as_view()),
    path('eval/',
         views.updateLearner.as_view()),
    path('register/', views.registerUser.as_view()),
    path('myprofile/', views.Myprofile.as_view()),
    path('myprofile/upgradeteacher/', views.upgradeToTeacher.as_view()),
    path('material/add', views.addMaterial.as_view()),
]
