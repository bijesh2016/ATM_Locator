from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import F
from django.db.models.functions import ACos, Cos, Radians, Sin
from .models import ATM
from .serializers import ATMSerializer

class ATMViewSet(viewsets.ModelViewSet):
    queryset = ATM.objects.all()
    serializer_class = ATMSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'bank_name', 'address', 'city', 'state', 'postal_code']
    ordering_fields = ['bank_name', 'city', 'created_at']

    @action(detail=False, methods=['get'])
    def nearby(self, request):
        """Find ATMs within a specified radius (in kilometers) of given coordinates."""
        try:
            lat = float(request.query_params.get('latitude', 0))
            lng = float(request.query_params.get('longitude', 0))
            radius = float(request.query_params.get('radius', 5))  # Default 5km radius

            # Haversine formula to calculate distance
            atms = ATM.objects.annotate(
                distance=ACos(
                    Cos(Radians(lat)) * Cos(Radians(F('latitude'))) *
                    Cos(Radians(F('longitude')) - Radians(lng)) +
                    Sin(Radians(lat)) * Sin(Radians(F('latitude')))
                ) * 6371  # Earth's radius in kilometers
            ).filter(distance__lte=radius).order_by('distance')

            serializer = self.get_serializer(atms, many=True)
            return Response(serializer.data)
        except (ValueError, TypeError):
            return Response(
                {"error": "Invalid parameters. Please provide valid latitude, longitude, and radius."},
                status=400
            ) 