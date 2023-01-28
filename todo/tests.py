import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate
from .views import ToDoModelViewSet
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
