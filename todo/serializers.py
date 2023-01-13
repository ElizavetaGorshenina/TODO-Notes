from rest_framework.serializers import HyperlinkedModelSerializer
from .models import Project, ToDo
from users.serializers import UserModelSerializer
from users.models import User


class ProjectModelSerializer(HyperlinkedModelSerializer):
    user = UserModelSerializer(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class ProjectForToDoModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = ['name']


class UserForToDoModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email']


class ToDoModelSerializer(HyperlinkedModelSerializer):
    user = UserForToDoModelSerializer()
    project = ProjectForToDoModelSerializer()
    
    class Meta:
        model = ToDo
        fields = '__all__'
