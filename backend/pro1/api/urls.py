from django.urls import path, include
from .views import register, login_user, test_view, create_appointment, user_appointments
from . import views

urlpatterns = [
    path('register/', register),
    path('login/', login_user),
    path('appointments/', views.create_appointment, name='create_appointment'),
    path('appointments/me/', views.user_appointments, name='user_appointments'),
    path('test/', test_view),
]
