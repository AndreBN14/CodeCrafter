
from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
from django.utils import timezone
from Apps.Loggin.forms import CustomUserCreationForm
from .models import Jugador

class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = Jugador
        fields = ['usuario', 'password1', 'password2', 'pais', 'email', 'first_name', 'last_name']

def register(request):
    if request.method == 'POST':
        print("Formulario enviado")
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            print("Formulario válido")
            user = form.save(commit=False)            
            user.is_active = True 
            user.is_staff = False
            user.is_superuser = False 
            user.date_joined = timezone.now()
            user.username = user.usuario
            
            user.save()
            
            login(request, user)
            return redirect('/')
        else:
            print("Formulario no válido")
            print(form.errors)
    else:
        form = CustomUserCreationForm()
    
    return render(request, 'register.html', {'form': form})

def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('home')  # Cambia a la URL a la que quieres redirigir
    return render(request, 'login.html')