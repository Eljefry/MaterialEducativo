from django.urls import path
from app.views import GetDepartamentos, CreateDepartamento, UpdateDepartamento, DeleteDepartamento

urlpatterns = [
    path('departamentos/', GetDepartamentos.as_view(), name='departamentos_list'),
    path('departamento/create', CreateDepartamento.as_view(), name='create_departamento'),
    path('departamento/update/<int:pk>', UpdateDepartamento.as_view(), name='update_departamento'),
    path('departamento/delete/<int:pk>', DeleteDepartamento.as_view(), name='delete_departamento'),
]