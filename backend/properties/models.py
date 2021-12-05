from django.db import models
from users.models import User

class Property(models.Model):

    property_id=models.CharField(max_length=32)
    name=models.CharField(max_length=200,null=False)
    city=models.CharField(max_length=200,null=False)
    country=models.CharField(max_length=200,null=False)
    image_url=models.URLField(max_length=500, null=False)
    users=models.ManyToManyField(User, related_name="user")