from django.shortcuts import get_object_or_404
from rest_framework import generics
from app.serializers.admin_serializer import *
from app.models import Departamento,Carrera,Materia,CarreraMateria,Categoria
from rest_framework.permissions import IsAuthenticated


#? CRUD Departamentos
class GetDepartamentos(generics.ListAPIView):
     queryset=Departamento.objects.all()
     serializer_class=DepartamentoSerializer
     
class CreateDepartamento(generics.CreateAPIView):
     serializer_class=DepartamentoSerializer
     def perform_create(self, serializer):
        serializer.save()
     
class UpdateDepartamento(generics.UpdateAPIView):
     queryset=Departamento.objects.all()
     serializer_class=DepartamentoSerializer
     
class DeleteDepartamento(generics.DestroyAPIView):
     queryset=Departamento.objects.all()
     serializer_class=DepartamentoSerializer
     

#? CRUD carreras
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

class CreateCarrera(generics.CreateAPIView):
     serializer_class=CarreraSerializer
     def perform_create(self, serializer):
        serializer.save()

class UpdateCarrera(generics.UpdateAPIView):
     queryset=Carrera.objects.all()
     serializer_class=CarreraSerializer
     
class DeleteCarrera(generics.DestroyAPIView):
     queryset=Carrera.objects.all()
     serializer_class=CarreraSerializer

        
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

class CreateMateria(generics.CreateAPIView):
     serializer_class=MateriaSerializer
     def perform_create(self, serializer):
        serializer.save()
        
class UpdateMateria(generics.UpdateAPIView):
     queryset=Materia.objects.all()
     serializer_class=MateriaSerializer

        
class DeleteMateria(generics.DestroyAPIView):
     queryset=Materia.objects.all()
     serializer_class=MateriaSerializer
     
class GetCategorias(generics.ListAPIView):
     queryset=Categoria.objects.all()
     serializer_class=CategoriaSerializer

class CreateCategoria(generics.CreateAPIView):
     serializer_class=CategoriaSerializer
     def perform_create(self, serializer):
        serializer.save()


class UpdateCategoria(generics.UpdateAPIView):
     queryset=Categoria.objects.all()
     serializer_class=CategoriaSerializer
     
class DeleteCategoria(generics.DestroyAPIView):
     queryset=Categoria.objects.all()
     serializer_class=CategoriaSerializer
     

     