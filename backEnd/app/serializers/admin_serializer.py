from rest_framework import serializers
from app.models import Departamento,Carrera,Materia,Categoria

#ESTE SERIALIZADOR PARA LOS CRUDS DE DEPARTAMENTO,CARRERA,MATERIA Y CATEGORIA


class DepartamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Departamento
        fields=['id','nombre']
        
    
class CarreraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carrera
        fields=['id','nombre','departamento']
        
class MateriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Materia
        fields=['id','nombre']
        
class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields=['id','nombre']
