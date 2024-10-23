"""
URL configuration for Rector_Simuleitor project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from Apps.Loggin.views import register, login_view
from django.views.generic import RedirectView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('loggin',login_view),
    path('registrarse',register),
    path('', RedirectView.as_view(url='/loggin')), # Redirigir a loggin
]

"""
from django.contrib import admin
from django.urls import path
from polls.views import index,coloresPrimarios,cargarHTML,yourName,cargandoTemp,usandoRender,barra,moto,hija1,hija2,allUsers

urlpatterns = [
    path("polls/",index),
    path("colores/<nombre>",coloresPrimarios),
    path('admin/', admin.site.urls),
    path('cargarHTML',cargarHTML),
    path('nombreInteractivo',yourName),
    path("cargando",cargandoTemp),
    path("render",usandoRender),
    path('barra',barra),
    path("moto",moto, name="moto"),
    path("hoja1",hija1, name="hoja1"),
    path("hoja2",hija2, name="hoja2"),
    path("todos",allUsers)
]

"""
