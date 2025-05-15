from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticated, AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from ..models import Bank, Branch, ATM
from .serializers import BankSerializer, BranchSerializer, ATMSerializer, ATMListSerializer
from .filters import ATMFilter, BranchFilter


class BankViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Bank.objects.all()
    serializer_class = BankSerializer
    permission_classes = [AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'swift_code']


class BranchViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Branch.objects.all()
    serializer_class = BranchSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_class = BranchFilter
    search_fields = ['name', 'district', 'city', 'street_address']

    def get_queryset(self):
        queryset = super().get_queryset()
        bank_id = self.request.query_params.get('bank', None)
        if bank_id:
            queryset = queryset.filter(bank_id=bank_id)
        return queryset


class ATMViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ATM.objects.all()
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_class = ATMFilter
    search_fields = ['location_name', 'district', 'city', 'street_address', 'landmark']

    def get_serializer_class(self):
        if self.action == 'list':
            return ATMListSerializer
        return ATMSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Filter by bank
        bank_id = self.request.query_params.get('bank', None)
        if bank_id:
            queryset = queryset.filter(bank_id=bank_id)
        
        # Filter by branch
        branch_id = self.request.query_params.get('branch', None)
        if branch_id:
            queryset = queryset.filter(branch_id=branch_id)
        
        # Filter by operational status
        is_operational = self.request.query_params.get('operational', None)
        if is_operational is not None:
            queryset = queryset.filter(is_operational=is_operational.lower() == 'true')
        
        # Filter by 24-hour service
        is_24_hours = self.request.query_params.get('24_hours', None)
        if is_24_hours is not None:
            queryset = queryset.filter(is_24_hours=is_24_hours.lower() == 'true')
        
        return queryset 