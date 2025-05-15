from rest_framework import serializers
from ..models import Bank, Branch, ATM


class BankSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bank
        fields = ['id', 'name', 'swift_code', 'logo', 'website', 'contact_number']


class BranchSerializer(serializers.ModelSerializer):
    bank_name = serializers.CharField(source='bank.name', read_only=True)
    
    class Meta:
        model = Branch
        fields = [
            'id', 'bank', 'bank_name', 'name', 'branch_code', 'province',
            'district', 'city', 'street_address', 'contact_number',
            'email', 'manager_name', 'latitude', 'longitude'
        ]


class ATMSerializer(serializers.ModelSerializer):
    bank_name = serializers.CharField(source='bank.name', read_only=True)
    branch_name = serializers.CharField(source='branch.name', read_only=True)
    province_name = serializers.CharField(source='get_province_display', read_only=True)
    
    class Meta:
        model = ATM
        fields = [
            'id', 'bank', 'bank_name', 'branch', 'branch_name', 'atm_id',
            'location_name', 'atm_type', 'is_24_hours', 'is_operational',
            'province', 'province_name', 'district', 'city', 'street_address',
            'landmark', 'latitude', 'longitude', 'features', 'opening_hours',
            'contact_number', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']


class ATMListSerializer(serializers.ModelSerializer):
    bank_name = serializers.CharField(source='bank.name', read_only=True)
    province_name = serializers.CharField(source='get_province_display', read_only=True)
    
    class Meta:
        model = ATM
        fields = [
            'id', 'bank_name', 'location_name', 'atm_type', 'is_24_hours',
            'is_operational', 'province_name', 'district', 'city',
            'street_address', 'landmark', 'latitude', 'longitude'
        ] 