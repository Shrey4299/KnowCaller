from rest_framework import serializers
from .user_model import User


class UserSerializer(serializers.ModelSerializer):
    # id = serializers.ReadOnlyField()

    class Meta:
        model = User
        fields = ['name', 'email', "phone_number","spam"]
