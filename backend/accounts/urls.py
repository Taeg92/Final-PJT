from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token

urlpatterns = [
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/signup/', include('rest_auth.registration.urls')),
    path('api-jwt-auth/', obtain_jwt_token),
    path('api-jwt-auth/refresh/', refresh_jwt_token),
    path('api-jwt-auth/verify/', verify_jwt_token),
]
