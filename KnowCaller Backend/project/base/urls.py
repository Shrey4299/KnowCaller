from django.urls import path, include
from rest_framework import routers
from base.views.user_view import UserList
from base.views.check_number_view import CheckNumber
from base.views.spam_creator_view import SpamUpdateAPIView



urlpatterns = [
    path('users/', UserList.as_view()),
    path('checknumber/', CheckNumber.as_view()),
    path('spamcreator/', SpamUpdateAPIView.as_view()),
]
