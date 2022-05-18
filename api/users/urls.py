from django.db import router

from rest_framework.routers import DefaultRouter

from users import views

router = DefaultRouter()
router.register(r'list', views.UsuarioViewSet)
router.register(r'types', views.TipoViewSet)
urlpatterns = router.urls
