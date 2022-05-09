from django.db import models

from vehicles.models import Vehiculo

class Estancia(models.Model):
    vehiculo = models.ForeignKey(Vehiculo, on_delete=models.CASCADE, null=False, blank=False)
    esta_de_alta = models.BooleanField(default=False)
    hora_entrada = models.DateTimeField(auto_now_add=True)
    hora_salida = models.DateTimeField(auto_now=True)
    esta_activo = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.hora_entrada} {self.vehiculo}'

class Pago(models.Model):
    fecha = models.DateField(auto_now_add=True)
    estancia = models.ForeignKey(Estancia, on_delete=models.CASCADE, null=False, blank=False)
    esta_activo = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.fecha} {self.estancia.vehiculo.placa}'

class ProxyPago(Pago):
    class Meta:
        proxy = True

    def importe_total(self):
        total = 0
        estado = self.estancia.vehiculo.tarifa.estado_residencia.estado
        entrada = self.estancia.hora_entrada
        salida = self.estancia.hora_salida
        if estado == 'residente' or estado  == 'no residente':
            anios = (int(salida.year) - int(entrada.year)) * 12
            meses = (int(salida.month) - int(entrada.month) + anios) * 30
            dias = (int(salida.day) - int(entrada.day) + meses) * 24
            horas = (int(salida.hour) - int(entrada.hour) + dias) * 60
            minutos = int(salida.minute) - int(entrada.minute) + horas
            tarifa = self.estancia.vehiculo.tarifa.importe
            total = tarifa * minutos
        return total

    def __str__(self):
        return f'{self.fecha} {self.estancia.vehiculo.placa}'

class Ticket(models.Model):
    codigo = models.CharField(max_length=255, null=False, blank=False)
    pago = models.ForeignKey(ProxyPago, on_delete=models.CASCADE, null=False, blank=False)
    esta_activo = models.BooleanField(default=True)

    def __str__(self):
        return self.codigo
