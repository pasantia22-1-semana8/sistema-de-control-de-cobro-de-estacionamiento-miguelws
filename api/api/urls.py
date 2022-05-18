from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/auth/', obtain_auth_token),
    path('api/v1/users/', include('users.urls')),
    path('api/v1/vehicles/', include('vehicles.urls')),
    path('api/v1/stays/', include('stays.urls')),
]