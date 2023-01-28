import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient
from .views import ToDoModelViewSet
from users.models import User as ToDoUser
from django.contrib.auth.models import User


class TestToDoViewSet(TestCase):

    def test_get_list_auth(self):
        factory = APIRequestFactory()
        user = User.objects.create_user('developer', 'hanna@develops.com', 'hannadevelops')
        request = factory.get('/todo')
        force_authenticate(request, user)
        view = ToDoModelViewSet.as_view({'get':'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestUserViewSet(TestCase):

    def test_get_detail_guest(self):
        user = ToDoUser.objects.create(username='Paul', firstname='Paul', lastname='Moses', birth_date='1981-08-11', email='paul@home.com')
        client = APIClient()
        response = client.get(f'/users/{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
