from django.urls import path, include,re_path
from rest_framework import routers
from app.views import *
from rest_framework_simplejwt.views import (TokenObtainPairView,TokenRefreshView,)


router= routers.DefaultRouter()
urlpatterns= [
    path('',include(router.urls)),
    path('registro/', CreateUser.as_view(),), 
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('documents_create/',CreateDocument.as_view(),),
    path('update/<int:pk>/',UpdatedUser.as_view()),
    path('update/estado/<int:pk>',UpdatedEstado.as_view()),
    path('delete/<int:pk>/', DeleteUser.as_view()), 
    path('last_folders_modified/<int:idUser>/',CarpetasModificadas.as_view()),
    path('documents_suggested/<int:idUser>/', DocumentosSugeridos.as_view()),
    path('user_profile/<int:pk>/', GetUser.as_view()), 
    path('users/', GetUsers.as_view()), 
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('documents/', GetDocuments.as_view()),
    path('documents/departaments/<int:idDepto>', GetDocumentsDepartaments.as_view()),
    path('documents/carrera/<int:idCarrera>', GetDocumentsCarreras.as_view()),
    path('documents/materia/<int:idMateria>', GetDocumentsMateria.as_view()),
    path('documents/category/<int:idCategory>', GetDocumentsCategory.as_view()),
    path('update/state/<int:pk>',UpdateState.as_view()),
    path('password_reset/', ResetPassword.as_view(), name='password_reset_request'),
    path('password_reset_confirm/', ResetPasswordConfirm.as_view(),),
    path('favorite_documents/<int:pk>',UserFavoritesDocuments.as_view()),
    path('user_documents/<int:pk>', UserDocuments.as_view()),
    path('list_user_folders/<int:pk>',UserFolders.as_view()),
    path('create_folder/',CreateFolder.as_view()),
    path('document/<int:pk>',GetDocument.as_view()),
    path('folder/<int:pk>',UserFolder.as_view()),
    path('departamentos', GetDepartamentos.as_view(),), 
    path('categorias', GetCategorias.as_view(),), 
    re_path(r'^carreras/(?:(?P<idDepto>\d+)/)?$', GetCarreras.as_view(), name='carreras'),
    re_path(r'^materias/(?:(?P<idCarrera>\d+)/)?$', GetMaterias.as_view(), name='materias'),
    
    ]