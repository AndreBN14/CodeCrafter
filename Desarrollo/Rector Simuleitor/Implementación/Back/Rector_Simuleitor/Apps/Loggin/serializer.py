from rest_framework import serializers

from .models import Jugador,Puntuacion,Eventos_Base

class PuntuacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Puntuacion
        fields = '__all__'  # O puedes especificar una lista de campos

class JugadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Jugador
        fields = '__all__'  # O puedes especificar una lista de campos

class EventosBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Eventos_Base
        fields = '__all__'  # O puedes especificar una lista de campos