from rest_framework import serializers
from .models import RegisterUser,SpamList, BlockedList, WhoViewedList, Comment


class CustomUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=False)
    name = serializers.CharField(required=True)
    phone_number = serializers.IntegerField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = RegisterUser
        fields = ('email', 'name', 'phone_number', 'password', 'spam', 'premium')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class SpamListSerializer(serializers.ModelSerializer):
    spammed_user = CustomUserSerializer(read_only=True)

    class Meta:
        model = SpamList
        fields = ('id', 'user', 'spammed_user', 'created_at')


class BlockedListSerializer(serializers.ModelSerializer):
    blocked_user = CustomUserSerializer(read_only=True)

    class Meta:
        model = BlockedList
        fields = ('id', 'user', 'blocked_user', 'created_at')

class WhoViewedListSerializer(serializers.ModelSerializer):
    viewed_user = CustomUserSerializer(read_only=True)

    class Meta:
        model = WhoViewedList
        fields = ('id', 'user', 'viewed_user', 'created_at')


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'