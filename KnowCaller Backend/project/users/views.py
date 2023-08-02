from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import SpamList, BlockedList, RegisterUser, WhoViewedList
from .serializers import CustomUserSerializer, SpamListSerializer, BlockedListSerializer, WhoViewedListSerializer
from rest_framework.permissions import AllowAny
from rest_framework.exceptions import AuthenticationFailed
import jwt, datetime
from django.shortcuts import get_object_or_404
from base.user_model import User
from base.user_serializer import UserSerializer
from .models import Comment
from .serializers import CommentSerializer


class CustomUserCreate(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format='json'):

        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetUserById(APIView):
    def get(self, request, user_id, format='json'):
        try:
            user = RegisterUser.objects.get(id=user_id)
            serializer = CustomUserSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except RegisterUser.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)


class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = RegisterUser.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('User not found!')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password!')

        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }
        #
        token = jwt.encode(payload, 'secret', algorithm='HS256')
        #
        response = Response()

        response.set_cookie(key='jwt', value=token, httponly=False)
        response.data = {
            'jwt': token,
            'id': user.id,
        }
        return response


class UserView(APIView):
    def get(self, request, format='json'):
        token = request.data.get('jwt')  # Get the token from the request body

        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = jwt.decode(token, 'secret', algorithms='HS256')  # Pass algorithm as a string, not a list
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        user = RegisterUser.objects.filter(id=payload['id']).first()
        serializer = CustomUserSerializer(user)
        return Response(serializer.data)


class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'success'
        }
        return response


class UserSpamListView(APIView):
    def get(self, request, user_id):
        user = RegisterUser.objects.get(pk=user_id)
        spam_list = SpamList.objects.filter(user=user)
        spam_serializer = SpamListSerializer(spam_list, many=True)
        return Response(spam_serializer.data)

    def post(self, request, user_id):
        phone_number = request.data.get('phone_number', None)
        if not phone_number:
            return Response({'detail': 'phone_number is required.'}, status=status.HTTP_400_BAD_REQUEST)

        user = get_object_or_404(RegisterUser, pk=user_id)

        spammed_user = RegisterUser.objects.filter(phone_number=phone_number).first()

        if not spammed_user:
            return Response({'detail': 'User with the provided phone_number does not exist.'},
                            status=status.HTTP_404_NOT_FOUND)

        # Update the spam field for the spammed_user and save the changes
        spammed_user.spam = True
        spammed_user.save()

        if SpamList.objects.filter(user=user, spammed_user=spammed_user).exists():
            return Response({'detail': 'User is already in the spam list.'}, status=status.HTTP_409_CONFLICT)

        spam_list = SpamList.objects.create(user=user, spammed_user=spammed_user)
        spam_serializer = SpamListSerializer(spam_list)
        return Response(spam_serializer.data, status=status.HTTP_201_CREATED)


class UserBlockListView(APIView):
    def get(self, request, user_id):
        user = RegisterUser.objects.get(pk=user_id)
        blocked_list = BlockedList.objects.filter(user=user)
        blocked_serializer = BlockedListSerializer(blocked_list, many=True)
        return Response(blocked_serializer.data)

    def post(self, request, user_id):
        phone_number = request.data.get('phone_number', None)
        if not phone_number:
            return Response({'detail': 'phone_number is required.'}, status=status.HTTP_400_BAD_REQUEST)

        user = get_object_or_404(RegisterUser, pk=user_id)
        blocked_user = RegisterUser.objects.filter(phone_number=phone_number).first()

        if not blocked_user:
            return Response({'detail': 'User with the provided phone_number does not exist.'},
                            status=status.HTTP_404_NOT_FOUND)

        # Check if the user is already in the blocked list
        if BlockedList.objects.filter(user=user, blocked_user=blocked_user).exists():
            return Response({'detail': 'User is already in the blocked list.'}, status=status.HTTP_409_CONFLICT)

        # Add the user to the blocked list
        blocked_list = BlockedList.objects.create(user=user, blocked_user=blocked_user)
        blocked_serializer = BlockedListSerializer(blocked_list)
        return Response(blocked_serializer.data, status=status.HTTP_201_CREATED)


class WhoViewedListView(APIView):
    def get(self, request, user_id):
        # Check if the user with the given user_id exists
        user = get_object_or_404(RegisterUser, pk=user_id)

        # Get the list of WhoViewedList objects for the given user
        who_viewed_list = WhoViewedList.objects.filter(user=user)

        # Serialize the data and return the response
        serializer = WhoViewedListSerializer(who_viewed_list, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, user_id):
        try:
            viewed_user = RegisterUser.objects.get(pk=user_id)
            phone_number = request.data.get("phone_number")

            if not phone_number:
                return Response(
                    {"error": "phone_number field is required."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Check if the user with the given phone number exists
            user = RegisterUser.objects.get(phone_number=phone_number)

            # Check if the entry already exists in the viewed list
            existing_entry = WhoViewedList.objects.filter(user=user, viewed_user=viewed_user).first()
            if existing_entry:
                return Response(
                    {"message": "User already exists in the viewed list."},
                    status=status.HTTP_200_OK
                )

            viewed_list = WhoViewedList.objects.create(user=user, viewed_user=viewed_user)
            serializer = WhoViewedListSerializer(viewed_list)

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except RegisterUser.DoesNotExist:
            return Response(
                {"error": f"User with phone number {phone_number} does not exist."},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class CommentListByPhoneNumber(APIView):

    def get(self, request):
        phone_number = request.data.get('phone_number')

        # if not phone_number:
        #     return Response({'detail': 'phone_number is required in the request body.'}, status=status.HTTP_400_BAD_REQUEST)

        user = get_object_or_404(RegisterUser, phone_number=phone_number)
        comments = Comment.objects.filter(user=user)

        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
