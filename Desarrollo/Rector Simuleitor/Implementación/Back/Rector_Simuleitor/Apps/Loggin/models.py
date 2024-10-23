from django.db import models
from datetime import date
from django.contrib.auth.models import AbstractUser
# Create your models here.
class Jugador(AbstractUser):
    jugador_id = models.AutoField(primary_key=True)
    usuario = models.CharField(max_length=30, unique=True)
    password = models.CharField(max_length=30)
    pais = models.CharField(max_length=30)

    # Esto deshabilita el campo username
    USERNAME_FIELD = 'usuario'
    REQUIRED_FIELDS = []  # Si necesitas otros campos obligatorios, los agregas aquí

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._meta.get_field('username').null = True
    
    def crear(cls,nombre,contraseña,pais): #crea instancia del objeto y la guarda en la bdd, si ya se tiene la instancia es mejor usar .save()
        nuevo= cls.objects.create(usuario=nombre,password=contraseña,pais=pais)
        return nuevo
    
    def __str__(self):
        identificador= str(self.usuario) +" "+ str(self.pais)
        return identificador
class Puntuacion(models.Model):
    puntuaciones = models.PositiveBigIntegerField() #me equivoque al nombrarla :( tomenlo como si dijiera score o puntuacion, no es una lista o coleccion, es un elemento nada mas
    fecha = models.DateField(default=date.today)
    dias = models.PositiveSmallIntegerField()
    isTheBest = models.BooleanField()
    recursos_criticos = models.JSONField(default=dict, blank=True)
    jugador_id = models.ForeignKey(Jugador, on_delete=models.CASCADE,db_column="jugador_ID",related_name="puntajes")

    def __init__(self,dias,recursos_criticos,jugador_id, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.dias=dias
        self.recursos_criticos=recursos_criticos
        self.jugador_id=jugador_id
        self.isTheBest=False
        self.puntuaciones=None
        self.recursos_criticos={}
    
    """
            SE REEMPLAZA ESTE METODO POR .save() ya que no se guardara una instacia incompleta, de forma que ahorramos I/O en la bdd
        def guardarEnBdd(cls,dias,recursos_cri,jugador_id):#Metodo de la clase para guardar en la bdd
        nuevaPuntuacion=cls.objects.create(dias=dias,recursos_criticos=recursos_cri,jugador_id=jugador_id) #guarda en la base de datos el objeto
        return nuevaPuntuacion
    """

    def calcularPuntuacion(self):
        puntuacion_dias = self.dias * 1000
        dinero = self.recursos_criticos.get('dinero', 0)  # Valor por defecto
        aprobacion = self.recursos_criticos.get('aprobacion', 0)  # Valor por defecto
        puntuacion_recursos = (dinero * 37) + (aprobacion * 53)
        self.puntuaciones = puntuacion_dias + puntuacion_recursos

    def is_The_Best(self,jugador_id):
        puntuaciones=list(Jugador.objects.get(jugador_id=jugador_id).puntajes.all())
        if not puntuaciones:
            self.isTheBest=True
        else:
            puntuaciones=sorted(puntuaciones, key=lambda p: p.puntuaciones) #orden ascendente
            self.is_The_Best = self.puntuaciones > puntuaciones[-1]

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
