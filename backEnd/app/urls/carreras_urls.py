from django.urls import path,re_path
from app.views import GetCarreras, CreateCarrera, UpdateCarrera, DeleteCarrera

urlpatterns = [
    re_path(r'^carreras/(?:(?P<idDepto>\d+)/)?$', GetCarreras.as_view(), name='carreras'),
    path('carreras/create/', CreateCarrera.as_view(), name='create_carrera'),
    path('carreras/update/<int:pk>/', UpdateCarrera.as_view(), name='update_carrera'),
    path('carreras/delete/<int:pk>/', DeleteCarrera.as_view(), name='delete_carrera'),
]