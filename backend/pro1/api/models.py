from django.db import models
from django.contrib.auth.hashers import make_password
from django.contrib.auth import get_user_model

class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    is_admin = models.BooleanField(default=False)   # 👈 NEW FIELD

    def save(self, *args, **kwargs):
        if not self.password.startswith("pbkdf2_"):
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.email


User = get_user_model()

class Appointment(models.Model):
    patient_name = models.CharField(max_length=255)
    patient_phone = models.CharField(max_length=20)
    service_name = models.CharField(max_length=255)
    provider = models.CharField(max_length=255)
    date = models.DateField()
    time = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="appointments")

    def __str__(self):
        return f"{self.patient_name} - {self.service_name} on {self.date}"