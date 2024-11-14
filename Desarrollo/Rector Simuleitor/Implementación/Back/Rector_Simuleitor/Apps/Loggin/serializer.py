from rest_framework import serializers
from .models import Jugador,Puntuacion,Eventos_Base
from django.contrib.auth.hashers import make_password
from .models import Jugador, Puntuacion, Eventos_Base


class JugadorSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Jugador
        fields = ['usuario', 'password', 'pais', 'email', 'first_name', 'last_name', 'jugador_id']

    def create(self, validated_data):
        # Asignar el campo 'usuario' a 'username'
        validated_data['username'] = validated_data['usuario']
        
        # Hash de la contraseña antes de guardarla en la base de datos
        validated_data['password'] = make_password(validated_data['password'])
        user = Jugador.objects.create(**validated_data)
        return user

class JugadorSerializerRanking(serializers.ModelSerializer):

    class Meta:
        model = Jugador
        fields = ['usuario', 'pais']

class PuntuacionSerializer(serializers.ModelSerializer):
    jugador = JugadorSerializerRanking(read_only=True, source='jugador_id')
    #jugador_id = serializers.IntegerField(source='jugador_id.id', read_only=True)
    #print(f"wazza {jugador_id}") ya no usados
    class Meta:
        model = Puntuacion
        #, 'jugador'
        fields = ['score', 'fecha', 'dias', 'recursos_criticos','jugador'] 

class EventosBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Eventos_Base
        fields = '__all__'
