from rest_framework import viewsets

from users.serializers import *
from users.models import *

class TipoViewSet(viewsets.ModelViewSet):
    serializer_class = TipoSerializer
    queryset = TipoUsuario.objects.all()

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = User.object.filter(is_active=True)
    serializer_class = UsuarioSerializer
