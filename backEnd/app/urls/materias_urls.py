from django.urls import path,re_path
from app.views import GetMaterias, CreateMateria, UpdateMateria, DeleteMateria,GetMateria

urlpatterns = [
   re_path(r'^materias/(?:(?P<idCarrera>\d+)/)?$', GetMaterias.as_view(), name='materias'),
   path('materia/<int:pk>', GetMateria.as_view(), name='get_materia'),
   path('materias/create',CreateMateria.as_view()),
   path('materias/update/<int:pk>',UpdateMateria.as_view()),
   path('materias/delete/<int:pk>',DeleteMateria.as_view()),
]