from django.urls import path
from app.views.Carpeta_views import *

urlpatterns = [
   path('folders/last_modified/<int:idUser>',CarpetasModificadas.as_view()),
   path('folders/list_user/<int:pk>',UserFolders.as_view()),
   path('folders/create',CreateFolder.as_view()),
   path('folders/<int:pk>',UserFolders.as_view()),
   path('folder/filters/',FolderModificFilter.as_view()),
]