from django.contrib import admin

# Register your models here.
from .models import Jugador,Puntuacion,Eventos_Base

admin.site.register(Jugador)
admin.site.register(Puntuacion)
admin.site.register(Eventos_Base)
"""
@admin.register(Jugador)
class MiModeloAdmin(admin.ModelAdmin):
    list_display = ('nombre',)  # Campos que se mostrarán en la lista
    search_fields = ('nombre',)  # Campo que se puede buscar
"""
