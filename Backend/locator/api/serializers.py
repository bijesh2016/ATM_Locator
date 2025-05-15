from rest_framework import serializers
from .models import ATM
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate


class ATMSerializer(serializers.ModelSerializer):
    class Meta:
        model = ATM
        fields = ['id', 'name', 'address', 'latitude', 'longitude', 'is_operational', 'created_at']


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email'),
            password=validated_data['password']
        )
        Token.objects.create(user=user)
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(username=data['username'], password=data['password'])
        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return {'user': user, 'token': token.key}
        raise serializers.ValidationError("Invalid username or password")


class LogoutSerializer(serializers.Serializer):
    # No fields required; token is in request.user
    def save(self, **kwargs):
        request = self.context.get('request')
        if request and hasattr(request.user, 'auth_token'):
            request.user.auth_token.delete()