from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

from stays.serializers import *
from stays.models import *

class EstanciaViewSet(viewsets.ModelViewSet):
    serializer_class = EstanciaSerializer
    queryset = Estancia.objects.filter(esta_activo=True, esta_de_alta=False)
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def update(self, request, pk=None):
        estancia = self.get_queryset().filter(id=pk).first()
        if estancia:
            estancia.esta_de_alta = True
            estancia.save()
            return Response({'message': 'Estancia actualizado correctamente!'}, status=status.HTTP_200_OK)
        return Response({'error': 'No existe esta estancia'}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        estancia = self.get_queryset().filter(id=pk).first()
        if estancia:
            estancia.esta_activo = False
            estancia.save()
            return Response({'message': 'Estancia eliminado correctamente!'}, status=status.HTTP_200_OK)
        return Response({'error': 'No existe esta estancia'}, status=status.HTTP_400_BAD_REQUEST)

class TicketViewSet(viewsets.ModelViewSet):
    serializer_class = TicketSerializer
    queryset = Ticket.objects.filter(esta_activo=True)
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def destroy(self, request, pk=None):
        ticket = self.get_queryset().filter(id=pk).first()
        if ticket:
            ticket.esta_activo = False
            ticket.save()
            return Response({'message': 'Ticket eliminado correctamente!'}, status=status.HTTP_200_OK)
        return Response({'error': 'No existe este ticket'}, status=status.HTTP_400_BAD_REQUEST)

class PagoViewSet(viewsets.ModelViewSet):
    serializer_class = PagoSerializer
    queryset = ProxyPago.objects.filter(esta_activo=True)
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def destroy(self, request, pk=None):
        pago = self.get_queryset().filter(id=pk).first()
        if pago:
            pago.esta_activo = False
            pago.save()
            return Response({'message': 'Pago eliminado correctamente!'}, status=status.HTTP_200_OK)
        return Response({'error': 'No existe este pago'}, status=status.HTTP_400_BAD_REQUEST)
