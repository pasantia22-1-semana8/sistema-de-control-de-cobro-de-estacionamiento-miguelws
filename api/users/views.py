from django.contrib.auth.models import User

from rest_framework import viewsets

from users.serializers import *

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
