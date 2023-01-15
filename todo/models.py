from django.db import models
from uuid import uuid4
from users.models import User


class Project(models.Model):
    id = models.UUIDField(default=uuid4, primary_key=True)
    name = models.CharField(max_length=32)
    user = models.ManyToManyField(User)
    link_to_repo = models.CharField(max_length=256, unique=True)


class ToDo(models.Model):
    id = models.UUIDField(default=uuid4, primary_key=True)
    project = models.ForeignKey(Project, models.PROTECT)
    text = models.TextField(blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    active = models.BooleanField(default=False)
