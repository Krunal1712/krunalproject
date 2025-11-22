from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password, check_password
from rest_framework import status
from django.contrib.auth import get_user_model
from .models import Appointment
from .serializers import UserSerializer, AppointmentSerializer

User = get_user_model()


# ---------------- REGISTER API ----------------
@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User registered successfully"}, status=201)
    return Response(serializer.errors, status=400)



# ---------------- LOGIN API ----------------
@api_view(['POST', 'GET'])
def login_user(request):
    email = request.data.get("email")
    password = request.data.get("password")

    if not email or not password:
        return Response({"error": "Email and password required"}, status=400)

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({"error": "User does not exist"}, status=404)

    if not check_password(password, user.password):
        return Response({"error": "Incorrect password"}, status=400)

    return Response({
        "user_id": user.id,
        "email": user.email,
        "is_admin": user.is_admin,
    })




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

@api_view(['GET'])
def test_view(request):
    return Response({"message": "API is working"})
