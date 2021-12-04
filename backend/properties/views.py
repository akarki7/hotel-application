from rest_framework.permissions import IsAuthenticated
from rest_framework.mixins import (
    CreateModelMixin,
    DestroyModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
)
from rest_framework.viewsets import GenericViewSet

from .models import Property

from .serializers import PropertySerializer

from .filters import PropertyFilter


class PropertyViewSet(CreateModelMixin,
                      ListModelMixin, DestroyModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = PropertySerializer
    queryset = Property.objects.all()
    filterset_class = PropertyFilter
