from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password, check_password
from rest_framework import status
from .models import User, Appointment
from .serializers import UserSerializer, AppointmentSerializer
from django.contrib.auth import get_user_model


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
            "is_admin": user.is_admin, 
        },
        status=status.HTTP_200_OK
    )


User = get_user_model()

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_appointment(request):
    data = request.data.copy()
    data['user'] = request.user.id
    serializer = AppointmentSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Appointment booked successfully", "appointment": serializer.data})
    return Response({"error": serializer.errors}, status=400)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_appointments(request):
    appointments = Appointment.objects.filter(user=request.user).order_by('date', 'created_at')
    serializer = AppointmentSerializer(appointments, many=True)
    return Response(serializer.data)