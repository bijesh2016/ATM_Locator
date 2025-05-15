from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from .models import ATM
from .serializers import ATMSerializer

from .serializers import RegisterSerializer, LoginSerializer, LogoutSerializer


class ATMViewSet(viewsets.ModelViewSet):
    queryset = ATM.objects.all()
    serializer_class = ATMSerializer


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer


class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = LogoutSerializer(context={'request': request})
        serializer.save()
        return Response({"detail": "Logged out successfully"}, status=status.HTTP_200_OK)
