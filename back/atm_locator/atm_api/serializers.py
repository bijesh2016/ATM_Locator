from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Bank, ATMFeature, ATMLocation, ATMReview

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')

class BankSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bank
        fields = '__all__'

class ATMFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = ATMFeature
        fields = '__all__'

class ATMReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = ATMReview
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')

class ATMLocationSerializer(serializers.ModelSerializer):
    bank = BankSerializer(read_only=True)
    bank_id = serializers.PrimaryKeyRelatedField(
        queryset=Bank.objects.all(),
        write_only=True,
        source='bank'
    )
    features = ATMFeatureSerializer(many=True, read_only=True)
    feature_ids = serializers.PrimaryKeyRelatedField(
        queryset=ATMFeature.objects.all(),
        write_only=True,
        source='features',
        many=True,
        required=False
    )
    reviews = ATMReviewSerializer(many=True, read_only=True)
    average_rating = serializers.SerializerMethodField()

    class Meta:
        model = ATMLocation
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')

    def get_average_rating(self, obj):
        reviews = obj.reviews.all()
        if not reviews:
            return None
        return sum(review.rating for review in reviews) / len(reviews) 