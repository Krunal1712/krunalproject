from django.urls import path, include
from .views import register, login
from . import views

urlpatterns = [
    path('register/', register),
    path('login/', login),
    path('appointments/', views.create_appointment, name='create_appointment'),
    path('appointments/me/', views.user_appointments, name='user_appointments'),
    # path('api/', include('api.urls')), 
]
