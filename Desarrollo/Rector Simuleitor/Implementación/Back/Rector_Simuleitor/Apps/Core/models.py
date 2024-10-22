from django.db import models
from datetime import date, time
# Create your models here. 
#Borrar es solo para ejemplo
class Usuario(models.Model):
    idUsuario = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    password = models.CharField(max_length=30)
    fechaRegistro = models.DateField(default=date.today)

    def __str__(self):
        return f"nom: {self.nombre} fecha: {self.fechaRegistro} pass={self.password}"

    def reporteMejora(self, idUsuario, fechaInicio, fechaFin, idEjercicio):
        pass

    def eliminarUsuario(self, nombre, password):
        pass

    def crearUsuario(self):
        pass

    def editarUsuario(self, nombre, password):
        pass