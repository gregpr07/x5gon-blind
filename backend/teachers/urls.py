from django.urls import path
from .views import presentPlayer, presentPlayers, defaultCall

urlpatterns = [
    path('present/<str:name>', presentPlayer.as_view()),
    path('players/', presentPlayers.as_view()),
    path('default/', defaultCall.as_view())
]
