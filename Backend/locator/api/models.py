from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.

class Bank(models.Model):
    name = models.CharField(max_length=100)
    swift_code = models.CharField(max_length=11, unique=True)
    logo = models.ImageField(upload_to='bank_logos/', null=True, blank=True)
    website = models.URLField(max_length=200, null=True, blank=True)
    contact_number = models.CharField(max_length=15, null=True, blank=True)

    def __str__(self):
        return self.name


class Branch(models.Model):
    PROVINCES = [
        ('1', 'Province 1'),
        ('2', 'Madhesh Province'),
        ('3', 'Bagmati Province'),
        ('4', 'Gandaki Province'),
        ('5', 'Lumbini Province'),
        ('6', 'Karnali Province'),
        ('7', 'Sudurpashchim Province'),
    ]

    bank = models.ForeignKey(Bank, on_delete=models.CASCADE, related_name='branches')
    name = models.CharField(max_length=100)
    branch_code = models.CharField(max_length=20, unique=True)
    province = models.CharField(max_length=2, choices=PROVINCES)
    district = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    street_address = models.CharField(max_length=200)
    contact_number = models.CharField(max_length=15, null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    manager_name = models.CharField(max_length=100, null=True, blank=True)

    latitude = models.DecimalField(
        max_digits=9, 
        decimal_places=6,
        validators=[
            MinValueValidator(26.3478), # Southernmost point of Nepal
            MaxValueValidator(30.4477)  # Northernmost point of Nepal
        ]
    )
    longitude = models.DecimalField(
        max_digits=9, 
        decimal_places=6,
        validators=[
            MinValueValidator(80.0884), # Westernmost point of Nepal
            MaxValueValidator(88.2026)  # Easternmost point of Nepal
        ]
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.bank.name} - {self.name}"

    class Meta:
        unique_together = ['bank', 'branch_code']


class ATM(models.Model):
    ATM_TYPES = [
        ('regular', 'Regular ATM'),
        ('deposit', 'Cash Deposit ATM'),
        ('drive_through', 'Drive Through ATM'),
    ]

    bank = models.ForeignKey(Bank, on_delete=models.CASCADE, related_name='atms')
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE, related_name='atms', null=True, blank=True)
    atm_id = models.CharField(max_length=20, unique=True)
    location_name = models.CharField(max_length=100)
    atm_type = models.CharField(max_length=20, choices=ATM_TYPES, default='regular')
    is_24_hours = models.BooleanField(default=True)
    is_operational = models.BooleanField(default=True)
    
    province = models.CharField(max_length=2, choices=Branch.PROVINCES)
    district = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    street_address = models.CharField(max_length=200)
    landmark = models.CharField(max_length=200, null=True, blank=True)
    
    latitude = models.DecimalField(
        max_digits=9, 
        decimal_places=6,
        validators=[
            MinValueValidator(26.3478),
            MaxValueValidator(30.4477)
        ]
    )
    longitude = models.DecimalField(
        max_digits=9, 
        decimal_places=6,
        validators=[
            MinValueValidator(80.0884),
            MaxValueValidator(88.2026)
        ]
    )

    features = models.JSONField(default=dict, help_text='ATM features like card types accepted, languages available, etc.')
    opening_hours = models.JSONField(null=True, blank=True, help_text='Opening hours if not 24/7')
    contact_number = models.CharField(max_length=15, null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.bank.name} ATM - {self.location_name}"

    class Meta:
        ordering = ['-created_at']