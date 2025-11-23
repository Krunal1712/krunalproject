from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password, check_password
from rest_framework import status
from datetime import date
from .models import User, Appointment, Service
from .serializers import UserSerializer, AppointmentSerializer


# ---------------- REGISTER API ----------------
@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User registered successfully"}, status=201)
    return Response(serializer.errors, status=400)


# ---------------- LOGIN API ----------------
@api_view(['POST'])
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


# ---------------- CREATE APPOINTMENT ----------------
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_appointment(request):
    data = request.data.copy()
    data['user'] = request.user.id
    serializer = AppointmentSerializer(data=data)

    if serializer.is_valid():
        serializer.save()
        return Response({
            "message": "Appointment booked successfully",
            "appointment": serializer.data
        })

    return Response({"error": serializer.errors}, status=400)


# ---------------- USER APPOINTMENTS ----------------
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_appointments(request):
    appointments = Appointment.objects.filter(user=request.user).order_by('date', 'created_at')
    serializer = AppointmentSerializer(appointments, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def test_view(request):
    return Response({"message": "API is working"})


# ---------------- ADMIN DASHBOARD ----------------
@api_view(['GET'])
def admin_dashboard(request):
    total_users = User.objects.count()
    total_services = Service.objects.count()
    total_appointments = Appointment.objects.count()

    today = date.today()
    todays = Appointment.objects.filter(date=today)

    todaySerialized = [
        {
            "id": a.id,
            "patientName": a.patient_name,
            "serviceName": a.service.name,
            "timeSlot": a.time
        }
        for a in todays
    ]

    time_slots = ["10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM", "04:00 PM"]

    return Response({
        "stats": {
            "users": total_users,
            "services": total_services,
            "appointments": total_appointments
        },
        "todayAppointments": todaySerialized,
        "timeSlots": time_slots
    })


# ---------------- PROVIDER ALL APPOINTMENTS ----------------
@api_view(['GET'])
def provider_all_appointments(request):
    appointments = Appointment.objects.all().order_by('date', 'time')
    serializer = AppointmentSerializer(appointments, many=True)
    return Response(serializer.data)
@api_view(['GET'])
def provider_today_appointments(request):
    today = date.today()
    appointments = Appointment.objects.filter(date=today).order_by('time')
    serializer = AppointmentSerializer(appointments, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def time_slots(request):
    return Response({
        "timeSlots": [
            "10:00 AM",
            "11:00 AM",
            "12:00 PM",
            "02:00 PM",
            "04:00 PM"
        ]
    })

register()
login_user()
create_appointment()
user_appointments()
test_view()
admin_dashboard()

provider_all_appointments()    
provider_today_appointments()  
time_slots()                   

