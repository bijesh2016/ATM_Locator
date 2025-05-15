from django.contrib import admin
from .models import ATMLocation

@admin.register(ATMLocation)
class ATMLocationAdmin(admin.ModelAdmin):
    list_display = ('name', 'bank_name', 'city', 'state', 'is_24_hours', 'is_active')
    list_filter = ('bank_name', 'city', 'state', 'is_24_hours', 'is_active')
    search_fields = ('name', 'bank_name', 'address', 'city', 'state')
    ordering = ('bank_name', 'city')
