from rest_framework import serializers
from rest_framework.authtoken.models import Token

from users.models import *

class TipoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoUsuario
        fields = '__all__'

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'user_type']
        #extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user_type'] = instance.user_type if instance.user_type == None else instance.user_type.rol
        return response

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user
