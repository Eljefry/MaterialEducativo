from django.urls import path, include
from rest_framework import routers
from app.views import *
from rest_framework_simplejwt.views import (TokenObtainPairView,TokenRefreshView,)


router= routers.DefaultRouter()
#router.register(r'Usuarios',views.UsuariosViewSet)
urlpatterns= [
    path('',include(router.urls)),
    path('registro/', CreateUser.as_view(),), 
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),#esta vista recibe el usuario y contraseña y si
    path('documents_create/',CreateDocument.as_view(),),
    path('update/<int:pk>/',UpdatedUser.as_view()),
    path('update/estado/<int:pk>',UpdatedEstado.as_view()),
    path('delete/<int:pk>/', DeleteUser.as_view()), 
    path('carpetas-modificadas/<int:idUser>/',CarpetasModificadas.as_view()),
    path('documentos-sugeridos/<int:idUser>/', DocumentosSugeridos.as_view()),
    path('user_profile/<int:pk>/', GetUser.as_view()), 
    path('users/', GetUsers.as_view()), 
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('documents/', GetDocuments.as_view()),#este controlador esta destinado al uso del admin
    path('update/state/<int:pk>',UpdateState.as_view()),
    path('password_reset/', ResetPassword.as_view(), name='password_reset_request'),
    path('password_reset_confirm/', ResetPasswordConfirm.as_view(),),
    #nuevo
    path('favorite_documents/<int:pk>',UserFavoritesDocuments.as_view()),
    path('user_documents/<int:pk>', UserDocuments.as_view()),#este controlador esta destinado al uso del usuario
    path('list_user_folders/<int:pk>',UserFolders.as_view()),
    path('create_folder/',CreateFolderUser.as_view()),
    path('document/<int:pk>',GetDocument.as_view()),
    path('folder/<int:pk>',UserFolder.as_view()),
    ]