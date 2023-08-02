from base.user_model import User
from base.user_serializer import UserSerializer
from users.models import RegisterUser
from users.serializers import CustomUserSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Q


class SpamUpdateAPIView(APIView):
    def post(self, request):
        phone_number = request.data.get("phone_number")

        user_queryset = User.objects.filter(phone_number=phone_number)
        register_user_queryset = RegisterUser.objects.filter(phone_number=phone_number)

        if user_queryset.exists():
            user_queryset.update(spam=True)

        if register_user_queryset.exists():
            register_user_queryset.update(spam=True)

        if user_queryset.exists() or register_user_queryset.exists():
            return Response({
                "message": "Spam status updated successfully",
                "phone_number": phone_number,
                "spam": True
            })
        else:
            return Response({"message": "User not found"})
