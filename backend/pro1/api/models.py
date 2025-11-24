from django.db import models
from django.contrib.auth.hashers import make_password


# ---------------- USER MODEL ----------------
class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    is_admin = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if not self.password.startswith("pbkdf2_"):
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.email


# ---------------- SERVICE MODEL ----------------
class Service(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    provider = models.CharField(max_length=255, blank=True, null=True)
    fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def __str__(self):
        return self.name


# ---------------- APPOINTMENT MODEL ----------------
class Appointment(models.Model):

    # PUBLIC BOOKING — NO LOGIN — so user is optional
    user = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="appointments"
    )

    # These two match your table columns (service_name, provider)
    service_name = models.CharField(max_length=255, null=True, blank=True)
    provider = models.CharField(max_length=255, null=True, blank=True)

    # Optional foreign key for linking service
    service = models.ForeignKey(
        Service,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    patient_name = models.CharField(max_length=255)
    patient_phone = models.CharField(max_length=20)

    date = models.DateField()
    time = models.CharField(max_length=20)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.patient_name} - {self.service_name} on {self.date}"
