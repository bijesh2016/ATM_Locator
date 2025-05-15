from rest_framework import serializers
from .models import ATM

class ATMSerializer(serializers.ModelSerializer):
    class Meta:
        model = ATM
        fields = [
            'id', 'name', 'bank_name', 'address', 'city', 'state',
            'postal_code', 'latitude', 'longitude', 'is_24_hours',
            'is_drive_through', 'created_at', 'updated_at'
        ] 