from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    
    nickname = models.CharField(max_length=20, blank=True)
    avatar = models.URLField()
    followers = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='followings')