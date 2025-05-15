from django.shortcuts import render
from rest_framework import viewsets, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Avg
from django_filters import rest_framework as django_filters
from .models import Bank, ATMFeature, ATMLocation, ATMReview
from .serializers import (
    BankSerializer, 
    ATMFeatureSerializer, 
    ATMLocationSerializer,
    ATMReviewSerializer
)

# Create your views here.

class BankViewSet(viewsets.ModelViewSet):
    queryset = Bank.objects.all()
    serializer_class = BankSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name']
    ordering_fields = ['name']

class ATMFeatureViewSet(viewsets.ModelViewSet):
    queryset = ATMFeature.objects.all()
    serializer_class = ATMFeatureSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class ATMLocationFilter(django_filters.FilterSet):
    min_rating = django_filters.NumberFilter(method='filter_by_rating', label='Minimum Rating')
    distance = django_filters.NumberFilter(method='filter_by_distance', label='Distance (km)')
    
    class Meta:
        model = ATMLocation
        fields = {
            'bank__name': ['exact', 'icontains'],
            'city': ['exact', 'icontains'],
            'state': ['exact', 'icontains'],
            'is_24_hours': ['exact'],
            'is_active': ['exact'],
            'features__name': ['exact'],
        }

    def filter_by_rating(self, queryset, name, value):
        return queryset.annotate(
            avg_rating=Avg('reviews__rating')
        ).filter(avg_rating__gte=value)

    def filter_by_distance(self, queryset, name, value):
        lat = self.request.query_params.get('latitude')
        lng = self.request.query_params.get('longitude')
        
        if lat and lng:
            # Add distance calculation logic here
            return queryset
        return queryset

class ATMLocationViewSet(viewsets.ModelViewSet):
    queryset = ATMLocation.objects.all()
    serializer_class = ATMLocationSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_class = ATMLocationFilter
    filter_backends = [
        django_filters.DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter
    ]
    search_fields = ['name', 'bank__name', 'address', 'city', 'state']
    ordering_fields = ['bank__name', 'city', 'created_at']

    @action(detail=True, methods=['post'])
    def add_review(self, request, pk=None):
        atm = self.get_object()
        serializer = ATMReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(atm=atm, user=request.user)
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

class ATMReviewViewSet(viewsets.ModelViewSet):
    queryset = ATMReview.objects.all()
    serializer_class = ATMReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [django_filters.DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['atm', 'rating', 'is_working']
    ordering_fields = ['created_at', 'rating']

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
