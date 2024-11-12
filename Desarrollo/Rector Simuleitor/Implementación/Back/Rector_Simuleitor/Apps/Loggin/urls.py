# urls.py en la aplicación
from django.urls import path
from .views import login_view
from django.contrib.auth import views as auth_views  # Esto es correcto

app_name = 'Loggin'  # en el contexto de mi app actual me sirve el app name?

urlpatterns = [
    path('login', login_view, name="login"),
]

""" Antes
urlpatterns = [
    path('home/', views.home, name='home'),  # Ruta para la página principal de tu app
    path('login/', views.login_view, name='login'),  # Vista personalizada de login
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),  # Vista de logout
    path('register/', views.register, name='register'),  # Vista de registro
]
"""
