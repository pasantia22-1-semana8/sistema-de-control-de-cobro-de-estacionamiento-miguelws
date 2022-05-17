from django.db import models

class TipoVehiculo(models.Model):
    nombre = models.CharField(max_length=100, null=False, blank=False)
    descripcion = models.CharField(max_length=255, null=True, blank=True)
    esta_activo = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre

class EstadoResidencia(models.Model):
    estado = models.CharField(max_length=100, null=False, blank=False)
    descripcion = models.CharField(max_length=255, null=True, blank=True)
    esta_activo = models.BooleanField(default=True)

    def __str__(self):
        return self.estado

class Tarifa(models.Model):
    tipo_vehiculo = models.ForeignKey(TipoVehiculo, on_delete=models.CASCADE, null=False, blank=False)
    estado_residencia = models.ForeignKey(EstadoResidencia, on_delete=models.CASCADE, null=False, blank=False)
    importe = models.DecimalField(max_digits=4, decimal_places=2, null=False, blank=False)
    descripcion = models.CharField(max_length=255, null=True, blank=True)
    esta_activo = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.tipo_vehiculo} {self.estado_residencia} {self.importe}'

class Vehiculo(models.Model):
    placa = models.CharField(max_length=100, unique=True, null=False, blank=False)
    tarifa = models.ForeignKey(Tarifa, on_delete=models.CASCADE, null=False, blank=False)
    descripcion = models.CharField(max_length=255, null=True, blank=True)
    esta_activo = models.BooleanField(default=True)

    def __str__(self):
        return self.placa
