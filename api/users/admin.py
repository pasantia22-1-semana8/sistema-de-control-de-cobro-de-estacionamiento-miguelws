from django.contrib import admin

from users import models

admin.site.register(models.TipoUsuario)
admin.site.register(models.User)
