from django.contrib import admin

from stays import models

admin.site.register(models.Estancia)
admin.site.register(models.Pago)
admin.site.register(models.Ticket)
