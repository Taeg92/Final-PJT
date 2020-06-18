from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    
    avatar = models.ImageField(blank=True, upload_to='accounts/avatar')