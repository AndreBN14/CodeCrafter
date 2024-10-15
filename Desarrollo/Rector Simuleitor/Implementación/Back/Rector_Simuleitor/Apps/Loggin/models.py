from django.db import models
from datetime import date
from django.contrib.auth.models import AbstractUser
# Create your models here.
class Jugador(AbstractUser):
    jugador_id = models.AutoField(primary_key=True)
    #usuario = models.CharField(max_length=30)
    #password = models.CharField(max_length=30)
    pais = models.CharField(max_length=30)
    
    def crear(cls,nombre,contraseña,pais):
        nuevo= cls.objects.create(usuario=nombre,password=contraseña,pais=pais)
        return nuevo
    
class Puntuacion(models.Model):
    puntuaciones = models.PositiveBigIntegerField()
    fecha = models.DateField(default=date.today)
    dias = models.PositiveSmallIntegerField()
    isTheBest = models.BooleanField()
    recursos_criticos = models.JSONField(default=dict, blank=True)
    jugador_id = models.ForeignKey(Jugador, on_delete=models.CASCADE,db_column="jugador_ID",related_name="puntajes")

    def crear(cls,dias,recursos_cri,jugador_id):#Metodo de la clase
        nuevaPuntuacion=cls.objects.create(dias=dias,recursos_criticos=recursos_cri,jugador_id=jugador_id)
        return nuevaPuntuacion
    
    def calcularPuntuacion(self,dias):
        #logica de calculo de puntuacion, indice [0] es dinero [1] es aprobacion 
        puntuacion_dias=dias*1000
        puntuacion_recursos=(self.recursos_criticos.get('dinero') * 37) + (self.recursos_criticos.get('aprobacion') * 31)
        return puntuacion_dias + puntuacion_recursos

    def is_The_Best(puntuacion,jugador_id):
        puntuaciones=list(Jugador.objects.get(jugador_id=jugador_id).puntajes.all())
        puntuaciones=puntuaciones.sorted()
        if puntuacion == puntuaciones[-1]:
            return True
        else:
            return False

class Eventos_Base(models.Model):
    evento_id=models.AutoField(primary_key=True)
    descripcion = models.TextField() #aqui va todo el textazo que necesita gpt para tener contexto
    elementos_afectados = models.JSONField(default=dict, blank=True)
    #chin chen guan chin chin - _ - 
    def crear(cls,descrip,e_afectados):
        nuevo=cls.objects.create(descripcion=descrip,elementos_afectados=e_afectados)
        return nuevo