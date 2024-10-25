from rest_framework import serializers
from app.models import Departamento,Carrera,Materia,Categoria

#ESTE SERIALIZADOR PARA LOS CRUDS DE DEPARTAMENTO,CARRERA Y MATERIA


class DepartamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Departamento
        fields=['id','nombre']
        
class DepartamentoCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Departamento
        fields=['nombre','departamento']
        

class CarreraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carrera
        fields=['id','nombre']
        
class MateriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Materia
        fields=['id','nombre']
        
class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields=['id','nombre']
