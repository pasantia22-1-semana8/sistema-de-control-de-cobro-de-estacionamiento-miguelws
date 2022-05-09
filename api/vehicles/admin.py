from django.contrib import admin
from vehicles import models

admin.site.register(models.TipoVehiculo)
admin.site.register(models.EstadoResidencia)
admin.site.register(models.Tarifa)
admin.site.register(models.Vehiculo)