from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    BankViewSet,
    ATMFeatureViewSet,
    ATMLocationViewSet,
    ATMReviewViewSet
)

router = DefaultRouter()
router.register(r'banks', BankViewSet)
router.register(r'features', ATMFeatureViewSet)
router.register(r'atms', ATMLocationViewSet)
router.register(r'reviews', ATMReviewViewSet)

urlpatterns = [
    path('', include(router.urls)),
] 