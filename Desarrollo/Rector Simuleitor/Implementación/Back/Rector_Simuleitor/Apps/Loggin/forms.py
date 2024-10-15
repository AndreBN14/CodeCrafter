# forms.py
from django import forms
from django.contrib.auth.forms import UserCreationForm
from Apps.Loggin.models import Jugador

class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = Jugador
        fields = ('username', 'password1', 'password2', 'pais')
