import rest_framework
from rest_framework.permissions import IsAuthenticated
from rest_framework.mixins import (
    CreateModelMixin,
    DestroyModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
)
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.viewsets import GenericViewSet
from rest_framework import status
from .models import Property
from users.models import User

from .serializers import PropertySerializer
from rest_framework.response import Response
from .filters import PropertyFilter


class PropertyViewSet(CreateModelMixin,
                      ListModelMixin, DestroyModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = PropertySerializer
    queryset = Property.objects.all().select_related("users")
    filterset_class = PropertyFilter

    def create(self,request):
        p_id=request.data['property_id']
        u_id=request.data['users']
        try:
            property = Property.objects.get(property_id=p_id)
            user=User.objects.get(id=u_id)
            property.users.add(user)
        except ObjectDoesNotExist:
            property = Property.objects.create(**request.data)

        out_serializer=PropertySerializer(instance=property)
        return Response(out_serializer.data, status=status.HTTP_201_CREATED)

    def update(self,request,*args,**kwargs):
        pass


