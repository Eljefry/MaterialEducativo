from django.shortcuts import get_object_or_404
from rest_framework import generics
from app.serializers.admin_serializer import *
from app.models import Departamento,Carrera,Materia,CarreraMateria
from rest_framework.permissions import IsAuthenticated


#? CRUD Departamentos
class GetDepartamentos(generics.ListAPIView):
     queryset=Departamento.objects.all()
     serializer_class=DepartamentoSerializer
     
class CreateDepartamento(generics.CreateAPIView):
     serializer_class=DepartamentoCreateSerializer
     def perform_create(self, serializer):
        serializer.save()
     
class UpdateDepartamentos(generics.UpdateAPIView):
     queryset=Departamento.objects.all()
     serializer_class=DepartamentoSerializer
     
class DeleteDepartamentos(generics.DestroyAPIView):
     queryset=Departamento.objects.all()
     serializer_class=DepartamentoSerializer
     

#en principio trae todas las carreras, acaso que en la ruta encuentre un idDepto que servira para solo listar las carreras pertenecientes a ese departamento
class GetCarreras(generics.ListAPIView):
    serializer_class = CarreraSerializer

    def get_queryset(self):
        idDepto = self.kwargs.get('idDepto', None)  # Obtener el parámetro opcional
        
        if idDepto:
            # Filtrar carreras por el departamento proporcionado
            carreras = Carrera.objects.filter(departamento_id=idDepto)
        else:
            # Si no hay idDepto, obtener todas las carreras
            carreras = Carrera.objects.all()
        
        return carreras
        
#en principio trae todas las Materias, acaso que en la ruta encuentre un idCarrera que servira para solo listar las Materias pertenecientes a esa carrera
class GetMaterias(generics.ListAPIView):
    serializer_class = MateriaSerializer

    def get_queryset(self):
        idCarrera = self.kwargs.get('idCarrera', None) 
        
        if idCarrera:
            # Filtrar las instancias en CarreraMateria que coincidan con el idCarrera
            materias_carrera = CarreraMateria.objects.filter(carrera_id=idCarrera).values_list('materia_id', flat=True)
            
            # Buscar las materias que tengan el ID que coincide con el set filtrado
            materias = Materia.objects.filter(id__in=materias_carrera)
        else:
            # Si no hay idCarrera, devolver todas las materias
            materias = Materia.objects.all()
        
        return materias
     
class GetCategorias(generics.ListAPIView):
     queryset=Categoria.objects.all()
     serializer_class=CategoriaSerializer
     