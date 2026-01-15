from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)




urlpatterns = [
    path("admin/", admin.site.urls),

    path("", include("blogapp.urls")),

    # 🔥 JWT (CSRF FREE)
    path("token/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token_refresh/", MyTokenRefreshView.as_view(), name="token_refresh"),
]

# Media & static (safe)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
