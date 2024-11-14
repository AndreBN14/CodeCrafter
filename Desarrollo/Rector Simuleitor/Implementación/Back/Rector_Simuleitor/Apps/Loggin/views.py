
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import get_object_or_404
from django.utils import timezone
from .serializer import JugadorSerializer
from .models import Jugador, Puntuacion
from Apps.Loggin.serializer import PuntuacionSerializer

class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = Jugador
        fields = ['usuario', 'password1', 'password2', 'pais', 'email', 'first_name', 'last_name']

@api_view(['POST'])
def register(request):
    serializer = JugadorSerializer(data=request.data)
    
    if serializer.is_valid():
        user = serializer.save()
        user.is_active = True
        user.is_staff = False
        user.is_superuser = False
        user.date_joined = timezone.now()
        user.save()
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login_view(request):
    user = get_object_or_404(Jugador, usuario=request.data['usuario'])
    
    if user.check_password(request.data['password']):
        serializer = JugadorSerializer(instance=user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response({'error': 'Invalid username or password'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def top_scores(request):
    top_scores = Puntuacion.objects.order_by('-score')[:20]
    serializer = PuntuacionSerializer(top_scores, many=True)
    
    return Response(serializer.data)
    
@api_view(['POST'])
def save_score(request):
    try:
        jugador = get_object_or_404(Jugador, pk=request.data['jugador_id'])
        
        # Crear la puntuación
        puntuacion = Puntuacion(jugador_id=jugador, dias=request.data['dias'], recursos_criticos=request.data['recursos_criticos'])
        puntuacion.calcularPuntuacion()  # Calcular la puntuación
        puntuacion.save()  # Guardar la puntuación
        
        # Serializar la puntuación y devolverla en la respuesta
        serializer = PuntuacionSerializer(puntuacion)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

