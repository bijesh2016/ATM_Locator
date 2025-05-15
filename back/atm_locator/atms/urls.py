from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ATMViewSet

router = DefaultRouter()
router.register(r'atms', ATMViewSet)

urlpatterns = [
    path('', include(router.urls)),
] 