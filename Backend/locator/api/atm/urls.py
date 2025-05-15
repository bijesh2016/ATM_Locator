from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('banks', views.BankViewSet, basename='bank')
router.register('branches', views.BranchViewSet, basename='branch')
router.register('atms', views.ATMViewSet, basename='atm')

urlpatterns = router.urls 