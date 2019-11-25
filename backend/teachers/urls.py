from django.urls import path
from .views import displayGauisan, presentPlayers

urlpatterns = [
    path('gaussian/<str:name>', displayGauisan.as_view()),
    path('players/', presentPlayers.as_view())
]
