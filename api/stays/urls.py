from django.db import router

from rest_framework.routers import DefaultRouter

from stays import views

router = DefaultRouter()
router.register(r'', views.EstanciaViewSet)
router.register(r'payments', views.PagoViewSet)
router.register(r'tickets', views.TicketViewSet)
urlpatterns = router.urls
