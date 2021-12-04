from .models import Property
from rest_framework import serializers
from users.serializers import UserSerializer

class PropertySerializer(serializers.ModelSerializer):
    user=UserSerializer(many=True, read_only=True)
    class Meta:
        model=Property
        fields="__all__"
