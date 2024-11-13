
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
from django.utils import timezone
from .serializer import JugadorSerializer
from .models import Jugador

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
        
        login(request, user)  # Autentica y crea la sesión
        return Response({'message': 'Registro exitoso'}, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('home')  # Cambia a la URL a la que quieres redirigir
    return render(request, 'login.html')
