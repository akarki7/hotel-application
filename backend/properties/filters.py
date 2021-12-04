from django_filters import rest_framework as filters
from .models import Property
from rest_framework.permissions import IsAuthenticated

class PropertyFilter(filters.FilterSet):

    permission_classes = [IsAuthenticated]

    user_id=filters.CharFilter(field_name="users__id")
    property_id=filters.CharFilter(field_name="property_id")

    class Meta:
        model = Property
        fields = (
            "user_id",
            "property_id",
        )