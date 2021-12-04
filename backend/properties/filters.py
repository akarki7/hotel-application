from django_filters import rest_framework as filters
from .models import Property

class PropertyFilter(filters.FilterSet):

    user_id=filters.CharFilter(field_name="users__id")

    class Meta:
        model = Property
        fields = (
            "user_id",
        )