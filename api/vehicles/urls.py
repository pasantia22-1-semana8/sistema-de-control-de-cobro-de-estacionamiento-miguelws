from django.db import router

from rest_framework.routers import DefaultRouter

from vehicles import views

router = DefaultRouter()
router.register(r'', views.VehiculoViewSet)
router.register(r'fees', views.TarifaViewSet)
router.register(r'types', views.TipoVehiculoViewSet)
router.register(r'status', views.EstadoResidenciaViewSet)
urlpatterns = router.urls
