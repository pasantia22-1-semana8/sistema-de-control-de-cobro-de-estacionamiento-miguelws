from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

from vehicles.serializers import *
from vehicles.models import *

class TipoVehiculoViewSet(viewsets.ModelViewSet):
    serializer_class = TipoVehiculoSerializer
    queryset = TipoVehiculo.objects.filter(esta_activo=True)
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def destroy(self, request, pk=None):
        tipo = self.get_queryset().filter(id=pk).first()
        if tipo:
            tipo.esta_activo = False
            tipo.save()
            return Response({'message': 'Tipo de vehiculo eliminado correctamente!'}, status=status.HTTP_200_OK)
        return Response({'error': 'No existe este tipo de vehiculo'}, status=status.HTTP_400_BAD_REQUEST)

class EstadoResidenciaViewSet(viewsets.ModelViewSet):
    serializer_class = EstadoResidenciaSerializer
    queryset = EstadoResidencia.objects.filter(esta_activo=True)
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def destroy(self, request, pk=None):
        estado = self.get_queryset().filter(id=pk).first()
        if estado:
            estado.esta_activo = False
            estado.save()
            return Response({'message': 'Estado de residencia eliminado correctamente!'}, status=status.HTTP_200_OK)
        return Response({'error': 'No existe este estado de residencia'}, status=status.HTTP_400_BAD_REQUEST)

class TarifaViewSet(viewsets.ModelViewSet):
    serializer_class = TarifaSerializer
    queryset = Tarifa.objects.filter(esta_activo=True)
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def destroy(self, request, pk=None):
        tarifa = self.get_queryset().filter(id=pk).first()
        if tarifa:
            tarifa.esta_activo = False
            tarifa.save()
            return Response({'message': 'Tarifa eliminado correctamente!'}, status=status.HTTP_200_OK)
        return Response({'error': 'No existe esta tarifa'}, status=status.HTTP_400_BAD_REQUEST)

class VehiculoViewSet(viewsets.ModelViewSet):
    serializer_class = VehiculoSerializer
    queryset = Vehiculo.objects.filter(esta_activo=True)
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]
    
    def destroy(self, request, pk=None):
        vehiculo = self.get_queryset().filter(id=pk).first()
        if vehiculo:
            vehiculo.esta_activo = False
            vehiculo.save()
            return Response({'message': 'Vehiculo eliminado correctamente!'}, status=status.HTTP_200_OK)
        return Response({'error': 'No existe este vehiculo'}, status=status.HTTP_400_BAD_REQUEST)
