from django.db import models
from datetime import date, time
# Create your models here.
class Jugador(models.Model):
    jugador_id = models.AutoField(primary_key=True)
    usuario = models.CharField(max_length=30)
    password = models.CharField(max_length=30)
    pais = models.CharField(max_length=30)
class Puntuacion(models.Model):
    puntuaciones = models.PositiveBigIntegerField()
    fecha = models.DateField(default=date.today)
    dias = models.PositiveSmallIntegerField()
    isTheBest = models.BooleanField()
    recursos_criticos = models.JSONField(default=dict, blank=True)
    jugador_id = models.ForeignKey(Jugador, on_delete=models.CASCADE,db_column="jugador_ID",related_name="puntajes")
class Eventos_Base(models.Model):
    evento_id=models.AutoField(primary_key=True)
    descripcion = models.TextField() #aqui va todo el textazo que necesita gpt para tener contexto
    elementos_afectados = models.JSONField(default=dict, blank=True)
    #chin chen guan chin chin - _ - 