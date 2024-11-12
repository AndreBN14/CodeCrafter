
from django.contrib.auth.backends import BaseBackend
from .models import Jugador  

class JugadorAuthBackend(BaseBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            # Busca el usuario en el modelo Jugador
            jugador = Jugador.objects.get(usuario=username)
            if jugador.check_password(password):  # Asumiendo que el modelo Jugador tiene este método
                return jugador
        except Jugador.DoesNotExist:
            return None

    def get_user(self, jugador_id):
        try:
            return Jugador.objects.get(pk=jugador_id)
        except Jugador.DoesNotExist:
            return None
