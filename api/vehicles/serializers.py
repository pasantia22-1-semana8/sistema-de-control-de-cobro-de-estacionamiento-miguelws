from rest_framework import serializers

from vehicles.models import *

class TipoVehiculoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoVehiculo
        fields = ['id', 'nombre', 'descripcion']

class EstadoResidenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstadoResidencia
        fields = ['id', 'estado', 'descripcion']

class TarifaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarifa
        fields = ['id', 'tipo_vehiculo', 'estado_residencia', 'importe', 'descripcion']

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['tipo_vehiculo'] = instance.tipo_vehiculo if instance.tipo_vehiculo == None else instance.tipo_vehiculo.nombre
        response['estado_residencia'] = instance.estado_residencia if instance.estado_residencia == None else instance.estado_residencia.estado
        return response

class VehiculoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehiculo
        fields = ['id', 'placa', 'tarifa', 'descripcion']

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['tarifa'] = instance.tarifa if instance.tarifa == None else str(instance.tarifa.importe) + ' ' + instance.tarifa.estado_residencia.estado
        return response
