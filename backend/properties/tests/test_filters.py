from django.test.testcases import TestCase
import pytest
from datetime import date, datetime, timedelta
from rest_framework.test import APIRequestFactory, APIClient
from users.models import User
from properties.models import Property
from properties.views import PropertyViewSet


@pytest.mark.django_db
class TestPropertyFilter(TestCase):
    def setUp(self) -> None:
        self.user = User.objects.create(email="testuser@gmail.com")
        self.user.set_password("12345")
        self.user.save()
        self.user_id=self.user.id 

        self.preexisting_property_1 = Property.objects.create(
            property_id= "96",
            name= "montabaur am quendelberg",
            city= "Munich",
            country= "Germany",
            image_url= "https://limehome.imgix.net/properties/95/2be1d260-b132-4811-9429-57eb8d004d4c.jpg",
        )

        self.preexisting_property_1.users.add(self.user_id)

        self.preexisting_property_2 = Property.objects.create(
            property_id= "95",
            name= "montabaur am quendelberg",
            city= "Munich",
            country= "Germany",
            image_url= "https://limehome.imgix.net/properties/95/2be1d260-b132-4811-9429-57eb8d004d4c.jpg",
        )
        self.preexisting_property_2.users.add(self.user_id)

        self.number_of_propertues = Property.objects.count()
        self.client = APIClient()
        url = "/api/auth/login/"
        response = self.client.post(url , {"email": "testuser@gmail.com", "password":"12345"})
        token = response.data.get("access", None)
        self.assertIsNotNone(token)
        self.client.credentials(HTTP_AUTHORIZATION="Bearer "+token)

    def test_filter_product_id_yields_no_results(self):
        response= self.client.get(f"/api/properties/?property_id=99")
        assert response.status_code == 200
        assert len(response.data)==0