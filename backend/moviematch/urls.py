"""moviematch URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path, re_path
from rest_auth.views import PasswordResetConfirmView

pass_reset = PasswordResetConfirmView.as_view()

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('profiles.urls')),
    path('api/movies/', include('movies.urls')),
    path('api/extern/', include('extern.urls')),
    path('api-auth/', include('rest_framework.urls')),
    path('api/rest-auth/', include('rest_auth.urls')),
    path('api/rest-auth/register/', include('rest_auth.registration.urls')),
    re_path(
        r'^rest-auth/password/reset/confirm/(?P<uidb64>(\d|\w)+)/(?P<token>(\d|\w)+-(\d|\w)+)/$',
        pass_reset, name='password_reset_confirm'
    ),
]
