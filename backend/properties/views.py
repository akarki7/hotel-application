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
    queryset = Property.objects.all()
    filterset_class = PropertyFilter

    def create(self,request):
        p_id=request.data['property_id']
        u_id=request.data['users']
        try:
            property = Property.objects.get(property_id=p_id)
            user=User.objects.get(id=u_id)
            property.users.add(user)
        except ObjectDoesNotExist:
            user=User.objects.get(id=u_id)  
            property = Property.objects.create(
                property_id= p_id,
                name= request.data['name'],
                city= request.data['city'],
                country= request.data['country'],
                image_url= request.data['image_url'],
            )
            property.users.add(user)

        out_serializer=PropertySerializer(instance=property)
        return Response(out_serializer.data, status=status.HTTP_201_CREATED)

    def update(self,request,*args, **kwargs):
        p_id=request.data['property_id']
        u_id=request.data['users']
        try:
            property = Property.objects.get(property_id=p_id)
            user=User.objects.get(id=u_id)
            property.users.remove(user)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        out_serializer=PropertySerializer(instance=property)
        return Response(out_serializer.data,status=status.HTTP_204_NO_CONTENT)