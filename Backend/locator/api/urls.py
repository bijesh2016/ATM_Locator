from django.urls import path, include

urlpatterns = [
    path('auth/', include('api.authentication.urls')),
    path('', include('api.atm.urls')),  # This will include banks/, branches/, and atms/ endpoints
]