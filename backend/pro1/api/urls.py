from django.urls import path
from .views import (
    register,
    login_user,
    test_view,
    create_appointment,
    user_appointments,
    admin_dashboard,
    provider_all_appointments,
    provider_today_appointments,
    time_slots
)

urlpatterns = [
    path('register/', register),
    path('login/', login_user),
    path('appointments/', create_appointment),
    path('appointments/me/', user_appointments),
    path('test/', test_view),

    # Admin Dashboard
    path("admin/dashboard/", admin_dashboard),

    # Provider
    path('provider/appointments/', provider_all_appointments),
    path('provider/appointments/today/', provider_today_appointments),
    path('provider/timeslots/', time_slots),
]
