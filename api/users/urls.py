from django.db import router

from rest_framework.routers import DefaultRouter

from users import views

router = DefaultRouter()
router.register(r'', views.UserViewSet)
urlpatterns = router.urls
