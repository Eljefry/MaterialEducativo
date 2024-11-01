from django.urls import path
from rest_framework_simplejwt.views import (TokenObtainPairView,TokenRefreshView,)
from app.views.User_views import *

urlpatterns = [
    path('users/registro', CreateUser.as_view(),), 
    path('users/login', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/update/<int:pk>/',UpdatedUser.as_view()),
    path('users/update/estado/<int:pk>',UpdatedEstado.as_view()),
    path('users/user_profile/<int:pk>/', GetUser.as_view()), 
    path('users/', GetUsers.as_view()), 
    path('users/delete/<int:pk>/', DeleteUser.as_view()), 
    path('users/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('users/password_reset/', ResetPassword.as_view(), name='password_reset_request'),
    path('users/password_reset_confirm/', ResetPasswordConfirm.as_view(),),
]