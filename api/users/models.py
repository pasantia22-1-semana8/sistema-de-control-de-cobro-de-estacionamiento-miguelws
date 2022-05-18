from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.models import BaseUserManager

class UserManager(BaseUserManager):
    def _create_user(self, username, email, password, is_superuser, is_staff, user_type, **extra_fields):
        user = self.model(
            username=username,
            email=email,
            is_superuser=is_superuser,
            is_staff=is_staff,
            user_type=user_type,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self.db)
        return user

    def create_user(self, username, email, password=None, **extra_fields):
        return self._create_user(username, email, password, False, False, None, **extra_fields)

    def create_superuser(self, username, email, password=None, **extra_fields):
        return self._create_user(username, email, password, True, True, None, **extra_fields)

class TipoUsuario(models.Model):
    rol = models.CharField(max_length=50, null=False, blank=False)
    descripcion = models.CharField(max_length=500, null=True, blank=True)

    def __str__(self):
        return self.rol

class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(max_length=255, unique=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    user_type = models.ForeignKey(TipoUsuario, on_delete=models.CASCADE, null=True, blank=True)
    object = UserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.username
