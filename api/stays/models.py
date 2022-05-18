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

class Ticket(models.Model):
    codigo = models.CharField(max_length=255, null=False, blank=False, unique=True)
    estancia = models.ForeignKey(Estancia, on_delete=models.CASCADE, null=False, blank=False)
    esta_activo = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.codigo} {self.estancia}'

class ProxyTicket(Ticket):
    class Meta:
        proxy = True

    def estancia_id(self):
        return self.estancia.id

    def __str__(self):
        return f'{self.codigo} {self.estancia}'

class Pago(models.Model):
    fecha = models.DateField(auto_now_add=True)
    ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE, null=False, blank=False)
    esta_activo = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.fecha} {self.ticket.codigo}'

class ProxyPago(Pago):
    class Meta:
        proxy = True

    def importe_total(self):
        total = 0
        estado = self.ticket.estancia.vehiculo.tarifa.estado_residencia.estado
        entrada = self.ticket.estancia.hora_entrada
        salida = self.ticket.estancia.hora_salida
        tarifa = self.ticket.estancia.vehiculo.tarifa.importe

        if estado == 'Residente' or estado  == 'No Residente':
            anios = (int(salida.year) - int(entrada.year)) * 12
            meses = (int(salida.month) - int(entrada.month) + anios) * 30
            dias = (int(salida.day) - int(entrada.day) + meses) * 24
            horas = (int(salida.hour) - int(entrada.hour) + dias) * 60
            minutos = int(salida.minute) - int(entrada.minute) + horas
            total = tarifa * minutos
        return total

    def __str__(self):
        return f'{self.fecha} {self.ticket.codigo}'