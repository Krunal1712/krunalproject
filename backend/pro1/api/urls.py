from django.urls import path
from .views import (
    register,
    login_user,
    test_view,
    create_appointment,
    user_appointments,
    user_appointments_by_id,
    admin_dashboard,
    provider_all_appointments,
    provider_today_appointments,
    time_slots
)

urlpatterns = [
    # Auth
    path('register/', register),
    path('login/', login_user),

    # Appointments
    path('appointments/create/', create_appointment),
    path('appointments/me/', user_appointments),

    # ✅ Add this missing one
    path('appointments/user/<int:user_id>/', user_appointments_by_id),

    # Testing
    path('test/', test_view),

    # Admin
    path("admin/dashboard/", admin_dashboard),

    # Provider
    path('provider/appointments/', provider_all_appointments),
    path('provider/appointments/today/', provider_today_appointments),
    path('provider/timeslots/', time_slots),
]
