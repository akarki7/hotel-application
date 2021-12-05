from django.test.testcases import TestCase
import pytest
from rest_framework.test import APIClient
from users.models import User

@pytest.mark.django_db
class TestLogin(TestCase):
    def test_login_without_authentication_access(self):
        client = APIClient()
        url = "/api/auth/login/"
        response = client.post(url , {"email": "testuser5@gmail.com", "password":"12345"})
        assert response.status_code == 401
        assert (response.data['detail'])=="No active account found with the given credentials"

    def test_login_with_authentication_access(self):
        user = User.objects.create(email="testuser@gmail.com")
        user.set_password("12345")
        user.save()
        client = APIClient()
        url = "/api/auth/login/"
        response = client.post(url , {"email": "testuser@gmail.com", "password":"12345"})
        assert response.status_code==200

class ProtectedURLAccess(TestCase):
    def test_access_without_authentication_access(self):
        client = APIClient()
        response= client.get(f"/api/properties/")
        assert response.status_code == 401

    def test_access_with_authentication_access(self):
        user = User.objects.create(email="testuser@gmail.com")
        user.set_password("12345")
        user.save()
        client = APIClient()
        url = "/api/auth/login/"
        response = client.post(url , {"email": "testuser@gmail.com", "password":"12345"})
        token = response.data.get("access", None)
        self.assertIsNotNone(token)
        client.credentials(HTTP_AUTHORIZATION="Bearer "+token)

        response_2= client.get(f"/api/properties/")
        assert response_2.status_code == 200
