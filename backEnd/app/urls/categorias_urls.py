from django.urls import path
from app.views import GetCategorias, CreateCategoria, UpdateCategoria, DeleteCategoria

urlpatterns = [
    path('categorias', GetCategorias.as_view(),), 
    path('categorias/create/', CreateCategoria.as_view(),), 
    path('categorias/update/<int:pk>/',UpdateCategoria.as_view(),), 
    path('categorias/delete/<int:pk>/', DeleteCategoria.as_view(),), 
    
]