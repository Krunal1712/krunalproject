from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password, check_password
from rest_framework import status
from .models import User
from .serializers import UserSerializer


# ---------------- REGISTER API ----------------
@api_view(['POST'])
def register(request):
    data = request.data.copy()

    # Hash password before saving
    if "password" in data:
        data["password"] = make_password(data["password"])

    serializer = UserSerializer(data=data)

    if serializer.is_valid():
        serializer.save()
        return Response(
            {"message": "User registered successfully"},
            status=status.HTTP_201_CREATED
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ---------------- LOGIN API ----------------
@api_view(['POST'])
def login(request):
    email = request.data.get("email")
    password = request.data.get("password")

    if not email or not password:
        return Response(
            {"error": "Email and password are required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response(
            {"error": "User does not exist"},
            status=status.HTTP_404_NOT_FOUND
        )

    # Validate password
    if not check_password(password, user.password):
        return Response(
            {"error": "Incorrect password"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # SUCCESS
    return Response(
        {
            "message": "Login successful",
            "user_id": user.id,
            "name": user.name,
            "email": user.email,
        },
        status=status.HTTP_200_OK
    )
