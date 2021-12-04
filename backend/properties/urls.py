from rest_framework.routers import SimpleRouter
from .views import PropertyViewSet

router = SimpleRouter()
router.register(r"properties", PropertyViewSet , basename="properties")

urlpatterns = router.urls