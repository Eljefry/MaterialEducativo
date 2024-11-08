from datetime import datetime, timedelta  
from django.utils import timezone 
from django.utils.timezone import now
from django.utils.dateparse import parse_date
from django.shortcuts import get_object_or_404
from rest_framework import generics
from app.serializers.Carpeta_serializer import *
from app.models import Carpeta,Usuarios
from rest_framework.permissions import IsAuthenticated

#?ACLARACION GENERAL DE ISAUTHENTICATED, TODOS LOS CONTROLADORES QUE TIENEN ESO SIGNIFICA QUE EN LA REQUEST VENDRA LA DATA
#?DEL USER QUE REALIZO LA PETICION, EN CASO DE QUE EL CONTROLADOR NO TENGA ISAUTHENTICATED ESO HARA QUE LA REQUEST TENGA 
#?UN CAMPO USER, PERO ESTE NO TENDRA LA DATA DE NINGUN USUARIO SINO QUE TENDRA UN ESTADO ANONIMO, POR ELLO LA REQUEST SIEMPRE
#?TENDRA EL CAMPO USER, PERO SU VALOR DEPENDE DE SI EL CONTROLADOR PIDE AUTENTICACION O NO.


class CarpetasModificadas(generics.ListAPIView):
    serializer_class=CarpetaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        idUser=self.kwargs['idUser']
        return Carpeta.objects.filter(usuario=idUser).order_by('-updated_at')[:3]

class UserFolders(generics.ListAPIView):
    serializer_class=Folders
    permission_classes=[IsAuthenticated]

    def get_queryset(self):
        user_id=self.kwargs['pk']  
        user=get_object_or_404(Usuarios,id=user_id)
        return Carpeta.objects.filter(usuario=user)
    

class UserFolder(generics.RetrieveAPIView):
    queryset=Carpeta.objects.all()
    serializer_class=Folders
    permission_classes=[IsAuthenticated]
    def get_object(self):
        user=self.request.user
        carpeta_id=self.kwargs.get('pk')
        return Carpeta.objects.get(id=carpeta_id,usuario=user)
    
class CreateFolder(generics.CreateAPIView):
    serializer_class=newFolder
    permission_classes=[IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)
        

class FolderModificFilter(generics.ListAPIView):#este controlador es uso en el filtro de la section MiUnidad, sirve para filtrar los folders de un user que se modificaron hoy, hace 7dias o un mes
    permission_classes = [IsAuthenticated]
    serializer_class = Folders

    def get_queryset(self):
        user_id = self.request.user.id
        queryset = Carpeta.objects.filter(usuario_id=user_id)
        modified_date=self.request.query_params.get('modifieddate')
        after_date = self.request.query_params.get('afterdate')
        before_date=self.request.query_params.get('beforedate')
        file_type = self.request.query_params.get('file_type')
        category = self.request.query_params.get('category')

        if file_type or category:
            return Carpeta.objects.none()  # Devuelve un queryset vacío
        else:
            if modified_date:
                if modified_date == 'hoy':
                    today = timezone.localdate() 
                    queryset = queryset.filter(updated_at=today)
                elif modified_date == '7days':
                    # Obtener la fecha de hace 7 días y filtrar a partir de ahí
                    start_date = now().date() - timedelta(days=7) 
                    queryset = queryset.filter(updated_at__gte=start_date) 
                elif modified_date == '30days':
                    # Obtener la fecha de hace 30 días y filtrar a partir de ahí
                    start_date = now().date() - timedelta(days=30) 
                    queryset = queryset.filter(updated_at__gte=start_date)         
            if after_date and before_date:
                after_date_parsed = parse_date(after_date)
                before_date_parsed = parse_date(before_date)
                if after_date_parsed and before_date_parsed:
                    queryset = queryset.filter(updated_at__gte=after_date_parsed, updated_at__lte=before_date_parsed)
        return queryset
