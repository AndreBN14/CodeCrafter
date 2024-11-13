from rest_framework import serializers
from .models import Jugador,Puntuacion,Eventos_Base
from django.contrib.auth.hashers import make_password
from .models import Jugador, Puntuacion, Eventos_Base

class PuntuacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Puntuacion
        fields = '__all__'  # O puedes especificar una lista de campos

class JugadorSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Jugador
        fields = ['usuario', 'password', 'pais', 'email', 'first_name', 'last_name']

    def create(self, validated_data):
        # Asignar el campo 'usuario' a 'username'
        validated_data['username'] = validated_data['usuario']
        
        # Hash de la contraseña antes de guardarla en la base de datos
        validated_data['password'] = make_password(validated_data['password'])
        user = Jugador.objects.create(**validated_data)
        return user

class EventosBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Eventos_Base
        fields = '__all__'  # O puedes especificar una lista de campos
