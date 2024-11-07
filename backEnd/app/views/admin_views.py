from django.shortcuts import get_object_or_404
from rest_framework import generics,status
from app.serializers.admin_serializer import *
from app.models import Departamento,Carrera,Materia,CarreraMateria,Categoria
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import APIException
from django.db.models.deletion import RestrictedError

#? CRUD Departamentos
class GetDepartamentos(generics.ListAPIView):
     queryset=Departamento.objects.all().order_by('-created_at')
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
     
     def delete(self, request, *args, **kwargs):
        try:
            return super().delete(request, *args, **kwargs)
        except RestrictedError as e:
            error_detail = "No se puede eliminar el departamento porque está asociado a una o más carreras."
            return Response({"detail": error_detail}, status=status.HTTP_400_BAD_REQUEST)
        except APIException as e:
            return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
     

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

class GetCarrera(generics.RetrieveAPIView):
    serializer_class = CarreraSerializer
    def get_object(self):
        idCarrera=self.kwargs.get('pk')
        return Carrera.objects.get(id=idCarrera)

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
            materias = Materia.objects.all().order_by('-id')
        
        return materias
    
class GetMateria(generics.RetrieveAPIView):
    serializer_class = MateriaSerializer
    def get_object(self):
        idMateria=self.kwargs.get('pk')
        return Materia.objects.get(id=idMateria)


class CreateMateria(generics.CreateAPIView):
    serializer_class = MateriaCreateUpdateSerializer
    queryset = Materia.objects.all()
        
class UpdateMateria(generics.UpdateAPIView):
     serializer_class=MateriaCreateUpdateSerializer
     def get_object(self):
        idMateria=self.kwargs.get('pk')
        return Materia.objects.get(id=idMateria)

        
class DeleteMateria(generics.DestroyAPIView):
     queryset=Materia.objects.all()
     serializer_class=MateriaSerializer
     
     def delete(self, request, *args, **kwargs):
        try:
            return super().delete(request, *args, **kwargs)
        except RestrictedError as e:
            error_detail = "No se puede eliminar la materia porque está asociado a uno o más Documentos."
            return Response({"detail": error_detail}, status=status.HTTP_400_BAD_REQUEST)
        except APIException as e:
            return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
     
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
     
     def delete(self, request, *args, **kwargs):
        try:
            return super().delete(request, *args, **kwargs)
        except RestrictedError as e:
            error_detail = "No se puede eliminar la categoria porque está asociado a uno o más Documentos."
            return Response({"detail": error_detail}, status=status.HTTP_400_BAD_REQUEST)
        except APIException as e:
            return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
     
     

     