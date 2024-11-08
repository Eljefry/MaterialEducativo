from django.urls import path
from app.views.Documents_views import *

urlpatterns = [
    path('documents/create/',CreateDocument.as_view(),),
    path('documents/suggested/<int:idUser>/', DocumentosSugeridos.as_view()),
    path('documents/', GetDocuments.as_view()),
    path('documents/departaments/<int:idDepto>', GetDocumentsDepartaments.as_view()),
    path('documents/carreras/<int:idCarrera>', GetDocumentsCarreras.as_view()),
    path('documents/materias/<int:idMateria>', GetDocumentsMateria.as_view()),
    path('documents/categorias/<int:idCategory>', GetDocumentsCategory.as_view()),
    path('documents/update/state/<int:pk>',UpdateState.as_view()),
    path('documents/favorite/<int:pk>',UserFavoritesDocuments.as_view()),
    path('documents/user/<int:pk>', UserDocuments.as_view()),
    path('document/<int:pk>',GetDocument.as_view()),
    path('document/types_documents/',GetExtentionsDocs.as_view()),
    path('document/filters/',GetDocumentsFilters.as_view()),

]