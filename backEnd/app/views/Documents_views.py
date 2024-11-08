from datetime import datetime, timedelta
from django.utils import timezone  
from django.utils.timezone import now
from django.shortcuts import get_object_or_404
from rest_framework import generics
from app.serializers.Documents_serializer import *
from app.models import Documentos,Comentario,Favorito,Interaccion,Carrera,Materia,CarreraMateria,Extencion
from rest_framework.permissions import IsAuthenticated
from django.utils.dateparse import parse_date

class CreateDocument(generics.CreateAPIView):
    serializer_class=DocumentSerializer
    permission_classes = [IsAuthenticated]
    #sobreescribo el metodo perform para que le asigne la instancia del user que hizo la peticion al campo owner
    def perform_create(self, serializer):
        user=self.request.user#asigno a user la instancia del usuario que esta en request.user
        serializer.save(owner=user)#guardo el documento creado asignandole a su campo owner el user 
    
class DeleteDocument(generics.DestroyAPIView):
    serializer_class=DocumentSerializer
    queryset=Documentos.objects.all()
    
class GetDocuments(generics.ListAPIView):#este controlador esta hecho para la zona admin, ya que trae documentos con la info de sus propietarios
    queryset=Documentos.objects.all()
    serializer_class=Documents
    
class UpdateState(generics.UpdateAPIView):
    queryset=Documentos.objects.all()
    serializer_class=updateState
    
class DocumentosSugeridos(generics.ListAPIView):
    serializer_class = DocumentsHome
    
    def get_queryset(self):
        idUser = self.kwargs['idUser'] 
        
        # Obtener los documentos sugeridos a partir de los comentarios y los puntajes
        documentos_sugeridos1 = self.get_documentos_por_comentarios(idUser)
        documentos_sugeridos2 = self.get_documentos_por_puntajes(idUser)
        documentos_sugeridos3 = self.get_ultimos_documentos()
        
        # Unir los conjuntos de documentos y aplicar distinct() para eliminar duplicados
        documentos_sugeridos = (documentos_sugeridos1 | documentos_sugeridos2 | documentos_sugeridos3).distinct()
        
        return documentos_sugeridos
    
    #? Esta función encapsula la lógica para obtener documentos sugeridos a partir de los comentarios del usuario.
    def get_documentos_por_comentarios(self, idUser):
        # Obtener todos los comentarios realizados por el usuario
        comentarios = Comentario.objects.filter(usuario_id=idUser)
        # Extraer los documentos de esos comentarios
        documentos_comentados = comentarios.values_list('documento_id', flat=True)
        # Obtener las materias asociadas a esos documentos
        materias_comentarios = Documentos.objects.filter(id__in=documentos_comentados).values_list('materia_id', flat=True).distinct()
        
        # Filtrar los documentos de esas materias, limitando el resultado a 5
        return Documentos.objects.filter(materia_id__in=materias_comentarios).order_by('-created_at')[:5]

    #? Esta función encapsula la lógica para obtener los documentos sugeridos a partir de los puntajes (interacciones) del usuario.
    def get_documentos_por_puntajes(self, idUser):
        puntajes = Interaccion.objects.filter(usuario_id=idUser)
        documentos_puntuados = puntajes.values_list('documento_id', flat=True)
        materias_puntajes = Documentos.objects.filter(id__in=documentos_puntuados).values_list('materia_id', flat=True).distinct()
        return Documentos.objects.filter(materia_id__in=materias_puntajes).order_by('-created_at')[:5]
    
    #? esta funcion obtiene los últimos 5 documentos ordenados por la fecha de creación
    def get_ultimos_documentos(self):
        return Documentos.objects.order_by('-created_at')[:5]




class UserFavoritesDocuments(generics.ListAPIView):
    serializer_class=userDocuments
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user_id=self.kwargs['pk']
        return Documentos.objects.filter(favorito__usuario_id=user_id)
        

class UserDocuments(generics.ListAPIView):#este controlador es destinado para el uso del usuario para recuperar sus documentos
    serializer_class=userDocuments
    permission_classes=[IsAuthenticated]

    def get_queryset(self):
        user_id=self.kwargs['pk']  # Asumiendo que el user_id se pasa como parte de la URL
        user=get_object_or_404(Usuarios,id=user_id)  # Obtiene el usuario o lanza un 404
        return Documentos.objects.filter(owner=user)


#este controlador solo trae 1 documento de un user autenticado,
class GetDocument(generics.RetrieveAPIView):
    serializer_class=DocumentSerializer
    queryset=Carpeta.objects.all()
    permission_classes=[IsAuthenticated]
    def get_object(self):
        user=self.request.user
        document_id=self.kwargs.get('pk')
        return Documentos.objects.get(id=document_id,usuario=user)
    

#Devuelve todos los documentos a partir de un documento
class GetDocumentsDepartaments(generics.ListAPIView):
    serializer_class = DocumentsHome
    
    def get_queryset(self):
        idDepto = self.kwargs['idDepto']  # Obtener el ID del departamento desde la URL
        
        # Obtener las carreras asociadas al departamento
        carreras = Carrera.objects.filter(departamento_id=idDepto)
        
        # Obtener las materias asociadas a las carreras
        materias = Materia.objects.filter(carreramateria__carrera__in=carreras)
        
        # Filtrar los documentos asociados a las materias
        documentos = Documentos.objects.filter(materia__in=materias)
        
        return documentos



class GetDocumentsCarreras(generics.ListAPIView):
    serializer_class = DocumentsHome
    
    def get_queryset(self):
        idCarrera = self.kwargs['idCarrera'] 
        
        materiascarreras = CarreraMateria.objects.filter(carrera_id=idCarrera)
        
        materias = materiascarreras.values_list('materia_id', flat=True)
        
        documentos = Documentos.objects.filter(materia__in=materias)
        
        return documentos
    
class GetDocumentsMateria(generics.ListAPIView):
    serializer_class = DocumentsHome
    def get_queryset(self):
        idMateria = self.kwargs['idMateria'] 
        documentos = Documentos.objects.filter(materia_id=idMateria)
        return documentos
    
    
    
class GetDocumentsCategory(generics.ListAPIView):
    serializer_class = DocumentsHome
    def get_queryset(self):
        idCategory = self.kwargs['idCategory'] 
        documentos = Documentos.objects.filter(categoria_id=idCategory)
        return documentos
    
class GetExtentionsDocs(generics.ListAPIView):
    queryset=Extencion.objects.all()
    serializer_class=Extencion_doc
    
    
#este controlador recibe varios filtros o solo 1 atravez de la solicitud, es usado por el filtro que comparten las section del sidebar del home(excepto por pagina principal)
class GetDocumentsFilters(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = userDocuments

    def get_queryset(self):
        user_id = self.request.user.id
        section = self.request.query_params.get('section')
        if section == 'favoritos': # Determina si se filtran favoritos o documentos del usuario
            queryset = Documentos.objects.filter(favorito__usuario_id=user_id) # Filtra solo los documentos que están en favoritos del usuario
        else: 
            queryset = Documentos.objects.filter(owner_id=user_id)# Filtra todos los documentos del usuario
        #obtengo los parametros
        file_type = self.request.query_params.get('file_type')
        category = self.request.query_params.get('category')
        modified_date=self.request.query_params.get('modifieddate')
        after_date = self.request.query_params.get('afterdate')
        before_date=self.request.query_params.get('beforedate')
        
        if file_type:
            queryset = queryset.filter(extencion__nombre=file_type)
        #filtra por categoria entre los docs que ya tiene queryset, si no encuentra ninguna coincidencia de categoria devuelve un query vacio
        if category:
            queryset = queryset.filter(categoria__nombre=category)
        if modified_date:
            if modified_date == 'hoy':
                   today = timezone.localdate()   # Obtiene la fecha de hoy
                   queryset = queryset.filter(updated_at=today)  # Compara solo la fecha
            elif modified_date == '7days':
                # Obtener la fecha de hace 7 días y filtrar a partir de ahí
                start_date = now().date() - timedelta(days=7)  # Esto sigue siendo correcto.
                queryset = queryset.filter(updated_at__gte=start_date)  # Esto es correcto.
            elif modified_date == '30days':
                # Obtener la fecha de hace 30 días y filtrar a partir de ahí
                start_date = now().date() - timedelta(days=30)  # Esto sigue siendo correcto.
                queryset = queryset.filter(updated_at__gte=start_date)  # Esto es correcto.          
        if after_date and before_date:
            after_date_parsed = parse_date(after_date)
            before_date_parsed = parse_date(before_date)
            if after_date_parsed and before_date_parsed:
                queryset = queryset.filter(updated_at__gte=after_date_parsed, updated_at__lte=before_date_parsed)
        return queryset


    
    
    

