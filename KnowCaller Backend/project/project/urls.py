from django.urls import path, include
from django.contrib import admin
from . import views

urlpatterns = [
    path('', include('base.urls')),
    path('', views.home, name='home'),
    path('admin/', admin.site.urls),
    path('registeruser/', include('users.urls')),
]
