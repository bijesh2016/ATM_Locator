from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Bank(models.Model):
    name = models.CharField(max_length=255, unique=True)
    logo = models.ImageField(upload_to='bank_logos/', null=True, blank=True)
    website = models.URLField(max_length=255, blank=True)
    customer_care = models.CharField(max_length=20, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']

class ATMFeature(models.Model):
    name = models.CharField(max_length=100, unique=True)
    icon = models.CharField(max_length=50, blank=True)  # For storing FontAwesome or similar icon names
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

class ATMLocation(models.Model):
    name = models.CharField(max_length=255)
    bank = models.ForeignKey(Bank, on_delete=models.CASCADE, related_name='atm_locations')
    address = models.TextField()
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=10)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    is_24_hours = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    features = models.ManyToManyField(ATMFeature, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.bank.name} - {self.name} ({self.city})"

    class Meta:
        ordering = ['bank__name', 'city']

class ATMReview(models.Model):
    RATING_CHOICES = (
        (1, '1 Star'),
        (2, '2 Stars'),
        (3, '3 Stars'),
        (4, '4 Stars'),
        (5, '5 Stars'),
    )

    atm = models.ForeignKey(ATMLocation, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.IntegerField(choices=RATING_CHOICES)
    comment = models.TextField()
    is_working = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        unique_together = ['atm', 'user']  # One review per ATM per user

    def __str__(self):
        return f"{self.user.username}'s review for {self.atm.name}"
