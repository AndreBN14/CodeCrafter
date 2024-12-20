from django.db import models
from datetime import date
from django.contrib.auth.models import AbstractUser
# Create your models here.
class Jugador(AbstractUser):
    jugador_id = models.AutoField(primary_key=True)
    usuario = models.CharField(max_length=30, unique=True)
    password = models.CharField(max_length=128)
    pais = models.CharField(max_length=30)


    USERNAME_FIELD = 'usuario'
    REQUIRED_FIELDS = []  

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._meta.get_field('username').null = True
    
    def crear(cls,nombre,contraseña,pais): 
        nuevo= cls.objects.create(usuario=nombre,password=contraseña,pais=pais)
        return nuevo
    
    def __str__(self):
        identificador= str(self.usuario) +" "+ str(self.pais)
        return identificador
    
class Puntuacion(models.Model):
    score = models.PositiveBigIntegerField(db_column='puntuaciones') 
    fecha = models.DateField(default=date.today)
    dias = models.PositiveSmallIntegerField()
    # isTheBest = models.BooleanField(default=True)
    recursos_criticos = models.JSONField(default=dict, blank=True)
    jugador_id = models.ForeignKey(Jugador, on_delete=models.CASCADE,db_column="jugador_ID",related_name="puntajes")

    """
    def __init__(self,dias,recursos_criticos,jugador_id, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.dias=dias
        self.recursos_criticos=recursos_criticos
        self.jugador_id=jugador_id
        self.isTheBest=False
        self.score=0
        self.recursos_criticos={}   
    """
    
    def calcularPuntuacion(self):
        puntuacion_dias = self.dias * 1000
        dinero = self.recursos_criticos.get('dinero', 0)  # Valor por defecto
        aprobacion = self.recursos_criticos.get('aprobacion', 0)  # Valor por defecto
        puntuacion_recursos = (dinero * 37) + (aprobacion * 53)
        self.score = puntuacion_dias + puntuacion_recursos 

    # def is_The_Best(self,jugador_id):
    #     puntuaciones=list(Jugador.objects.get(jugador_id=jugador_id).puntajes.all())
    #     if not puntuaciones: #osea es el primer registro entonce es el mejor
    #         self.isTheBest=True
    #     else:
    #         puntuaciones=sorted(puntuaciones, key=lambda p: p.score) #orden ascendente
    #         if self.score > puntuaciones[-1].score:
    #             puntuaciones[-1].isTheBest = False #dejo de ser el mejor puntaje
    #             self.is_The_Best = True
    #         else:
    #             self.is_The_Best = False


    def __str__(self):
        identificador= str(self.jugador_id) +" "+ str(self.fecha)
        return identificador


class Eventos_Base(models.Model):
    evento_id=models.AutoField(primary_key=True)
    descripcion = models.TextField() #aqui va todo el textazo que necesita gpt para tener contexto
    elementos_afectados = models.JSONField(default=dict, blank=True)

    def crear(cls,descrip,e_afectados):
        nuevo=cls.objects.create(descripcion=descrip,elementos_afectados=e_afectados)
        return nuevo
    def __str__(self):
        return self.evento_id
    #chin chen guan chin chin - _ - 
