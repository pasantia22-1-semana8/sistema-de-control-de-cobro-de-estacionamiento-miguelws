from rest_framework import serializers

from stays.models import *

class EstanciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estancia
        fields = ['id', 'vehiculo', 'esta_de_alta', 'hora_entrada', 'hora_salida']

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['vehiculo'] = (
            instance.vehiculo if instance.vehiculo == None else
            instance.vehiculo.placa + ' ' +
            instance.vehiculo.tarifa.estado_residencia.estado + ' ' +
            instance.vehiculo.tarifa.tipo_vehiculo.nombre
        )
        response['hora_entrada'] = instance.hora_entrada.strftime("%d/%m/%Y %I:%M %p")
        response['hora_salida'] = instance.hora_salida.strftime("%d/%m/%Y %I:%M %p")
        return response

class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProxyTicket
        fields = ['id', 'codigo', 'estancia', 'estancia_id']

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['estancia'] = (
            instance.estancia if instance.estancia == None else
            instance.estancia.vehiculo.placa + ' '+
            instance.estancia.vehiculo.tarifa.estado_residencia.estado + ' ' +
            instance.estancia.vehiculo.tarifa.tipo_vehiculo.nombre + ' ' +
            instance.estancia.hora_entrada.strftime("%d/%m/%Y %I:%M %p")
        )
        return response

class PagoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProxyPago
        fields = ['id', 'fecha', 'ticket', 'importe_total']

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['fecha'] = instance.fecha.strftime("%d/%m/%Y")
        response['ticket'] = (
            instance.ticket.ticket if instance.ticket == None else
            instance.ticket.estancia.vehiculo.placa + ' '+
            instance.ticket.estancia.vehiculo.tarifa.estado_residencia.estado + ' ' +
            instance.ticket.estancia.vehiculo.tarifa.tipo_vehiculo.nombre + ' ' +
            instance.ticket.estancia.hora_entrada.strftime("%d/%m/%Y %I:%M %p") + ' - ' +
            instance.ticket.estancia.hora_salida.strftime("%d/%m/%Y %I:%M %p")
        )
        return response
