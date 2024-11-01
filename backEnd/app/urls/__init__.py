from .carreras_urls import urlpatterns as carreras_urls
from .materias_urls import urlpatterns as materias_urls
from .departamentos_urls import urlpatterns as departamentos_urls
from .carpetas_urls import urlpatterns as carpetas_urls
from .documentos_urls import urlpatterns as documentos_urls
from .usuario_urls import urlpatterns as usuario_urls
from .categorias_urls import urlpatterns as categorias_urls




urlpatterns = []
urlpatterns += carreras_urls
urlpatterns += materias_urls
urlpatterns += departamentos_urls
urlpatterns += carpetas_urls
urlpatterns += documentos_urls
urlpatterns += usuario_urls
urlpatterns += categorias_urls
