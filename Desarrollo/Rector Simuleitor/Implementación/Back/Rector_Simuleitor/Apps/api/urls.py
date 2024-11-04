from django.urls import path
from .views import ChatGPTAPIView

urlpatterns = [
    path('generar-evento', ChatGPTAPIView.as_view(), name='generar_evento'),
]
