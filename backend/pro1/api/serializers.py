from rest_framework import serializers
from .models import User, Appointment, Service


# ---------------- USER SERIALIZER ----------------
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password', 'is_admin']
        extra_kwargs = {
            'password': {'write_only': True}
        }


# ---------------- SERVICE SERIALIZER (optional but useful) ----------------
class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'name', 'description', 'provider', 'fee']


# ---------------- APPOINTMENT SERIALIZER ----------------
class AppointmentSerializer(serializers.ModelSerializer):

    # Optional: show service details instead of only service ID
    service = ServiceSerializer(read_only=True)
    service_id = serializers.PrimaryKeyRelatedField(
        queryset=Service.objects.all(),
        source="service",
        write_only=True,
        required=False
    )

    class Meta:
        model = Appointment
        fields = [
            "id",
            "user",
            "service",
            "service_id",        # ← allows frontend to send service_id
            "service_name",
            "provider",
            "patient_name",
            "patient_phone",
            "date",
            "time",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]
