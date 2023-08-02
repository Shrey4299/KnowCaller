from users.models import RegisterUser
from users.serializers import CustomUserSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Q
from base.user_model import User
from base.user_serializer import UserSerializer


class CheckNumber(APIView):

    def get(self, request, format=None):
        users = list(User.objects.all()) + list(RegisterUser.objects.all())
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        name_query = request.data.get("name")
        phone_query = request.data.get("phone_number")

        results = []

        if phone_query:
            register_users = list(RegisterUser.objects.filter(phone_number__contains=phone_query))
            if register_users:
                for user in register_users:
                    results.append({
                        "id": user.id,  # Add the 'id' field to the response
                        "email": user.email,
                        "name": user.name,
                        "phone_number": user.phone_number,
                        "spam": getattr(user, 'spam', False)
                    })
            else:
                users = User.objects.filter(phone_number__contains=phone_query)
                for user in users:
                    results.append({
                        "id": user.id,  # Add the 'id' field to the response
                        "name": user.name,
                        "phone_number": user.phone_number,
                        "spam": getattr(user, 'spam', False)
                    })
        elif name_query:
            users = User.objects.filter(Q(name__startswith=name_query) | Q(name__contains=name_query))
            sorted_users = sorted(users, key=lambda u: not u.name.startswith(name_query))
            for user in sorted_users:
                results.append({
                    "id": user.id,  # Add the 'id' field to the response
                    "name": user.name,
                    "phone_number": user.phone_number,
                    "spam": getattr(user, 'spam', False)
                })
        else:
            return Response({"message": "No phone number or name query provided"})

        return Response(results)
