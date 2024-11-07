from rest_framework import serializers
from app.models import Departamento,Carrera,Materia,Categoria,CarreraMateria

#ESTE SERIALIZADOR PARA LOS CRUDS DE DEPARTAMENTO,CARRERA,MATERIA Y CATEGORIA


class DepartamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Departamento
        fields=['id','nombre']
        
    
class CarreraSerializer(serializers.ModelSerializer):
    departamento_nombre = serializers.CharField(source='departamento.nombre', read_only=True)  
    class Meta:
        model = Carrera
        fields=['id','nombre','departamento_nombre','departamento']
        
class MateriaSerializer(serializers.ModelSerializer):
    #SerializerMethodField, que permite añadir campos calculados o generados dinámicamente en el Serializer.
    carreras = serializers.SerializerMethodField()
    class Meta:
        model = Materia
        fields=['id','nombre','carreras']
        
    def get_carreras(self, materia):
        # Aquí se obtiene una lista de carreras relacionadas a través de CarreraMateria.
        carreras = Carrera.objects.filter(carreramateria__materia=materia) # Filtra las carreras relacionadas con la materia `obj`
        return CarreraSerializer(carreras, many=True).data # Serializa la lista de carreras relacionadas
    
    
class MateriaCreateUpdateSerializer(serializers.ModelSerializer):
    carreras = serializers.ListField(
        child=serializers.IntegerField(), write_only=True  # Lista de IDs de carreras
    )

    class Meta:
        model = Materia
        fields = ['nombre', 'carreras']  # Incluye el campo 'carreras'

    def create(self, validated_data):
        # Extraemos el campo 'carreras' del diccionario validado
        carrera_ids = validated_data.pop('carreras')
        
        # Creamos la nueva instancia de Materia
        materia = Materia.objects.create(**validated_data)

        # Asociamos las carreras a la materia en CarreraMateria
        for carrera_id in carrera_ids:
            CarreraMateria.objects.create(materia=materia, carrera_id=carrera_id)

        return materia

    def update(self, instance, validated_data):
        # Actualiza el nombre de la materia
        instance.nombre = validated_data.get('nombre', instance.nombre)
        instance.save()

        # Extraemos la lista de carreras y actualizamos la relación en CarreraMateria
        carrera_ids = validated_data.get('carreras', [])
        
        # Elimina las relaciones actuales
        CarreraMateria.objects.filter(materia=instance).delete()
        
        # Crea las nuevas relaciones
        for carrera_id in carrera_ids:
            CarreraMateria.objects.create(materia=instance, carrera_id=carrera_id)

        return instance

        
class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields=['id','nombre']
