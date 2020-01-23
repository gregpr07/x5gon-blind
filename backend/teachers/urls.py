from django.urls import path
from .views import presentPlayer, presentPlayers

urlpatterns = [
    path('present/<str:name>', presentPlayer.as_view()),
    path('players/', presentPlayers.as_view())
]
