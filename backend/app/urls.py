from django.contrib import admin
from django.urls import path
from django.urls.conf import include
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
)
from watchman.views import status
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path("api/health", status, name="health-view"),
    path("api/schema", SpectacularAPIView.as_view(), name="schema"),
    path(
        "api/schema/swagger-ui",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),
    path('api/', include(('users.routers', 'core'), namespace='core-api'))
]
