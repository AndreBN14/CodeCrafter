
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt 
import json
    
@csrf_exempt
def login_view(request):
    print(f"Método HTTP recibido: {request.method}")  # Agrega esta línea para verificar el método
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            print(f"Datos recibidos: {data}")  # Agrega esta línea para ver los datos recibidos
            username = data.get("username")
            password = data.get("password")

            user = authenticate(request, username=username, password=password)

            if user is not None:
                login(request, user)
                return JsonResponse({"message": "Inicio de sesión exitoso"}, status=200)
            else:
                return JsonResponse({"message": "Usuario no encontrado Credenciales incorrectas"}, status=401)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Error en los datos enviados"}, status=400)
    return JsonResponse({"error": "Método no permitido"}, status=405)